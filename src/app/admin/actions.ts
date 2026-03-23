'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from 'fs/promises';
import path from 'path';

// Helper function to save the file
async function saveImage(imageFile: File): Promise<string> {
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Sanitize the filename to remove special characters and spaces
  const originalName = path.parse(imageFile.name).name;
  const extension = path.parse(imageFile.name).ext;
  const sanitizedName = originalName
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-.]+/g, ''); // Remove all non-word chars except dots and hyphens

  // Generate a unique filename
  const filename = `${Date.now()}-${sanitizedName}${extension}`;
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const imagePath = path.join(uploadsDir, filename);

  // Save the file
  await writeFile(imagePath, buffer);

  // Return the public path
  return `/uploads/${filename}`;
}

export async function deleteProduct(productId: number) {
  try {
    await prisma.review.deleteMany({
      where: { productId }
    });
    await prisma.product.delete({
      where: { id: productId }
    });
    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/nouveautes');
    revalidatePath('/homme');
    revalidatePath('/femme');
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    throw error;
  }
}

export async function addProduct(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = Number(formData.get('price'));
  const gender = formData.get('gender') as string;
  const category = formData.get('category') as string;
  const imageFile = formData.get('image') as File;

  if (!imageFile || imageFile.size === 0) {
    return { error: "L'image est requise." };
  }

  try {
    // Save the image and get its public path
    const imageUrl = await saveImage(imageFile);

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        gender,
        category
      }
    });
    
    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/nouveautes');
    revalidatePath('/homme');
    revalidatePath('/femme');

  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    return { error: "Impossible d'ajouter le produit." };
  } finally {
    redirect('/admin');
  }
}

export async function updateProduct(productId: number, prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = Number(formData.get('price'));
  const gender = formData.get('gender') as string;
  const category = formData.get('category') as string;
  const imageFile = formData.get('image') as File;
  
  // Keep track of the image URL
  let imageUrl = formData.get('currentImageUrl') as string;

  try {
    // If a new image is uploaded, save it and update the URL
    if (imageFile && imageFile.size > 0) {
      imageUrl = await saveImage(imageFile);
      // Here you might want to delete the old image from the filesystem
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price,
        imageUrl,
        gender,
        category
      }
    });
    
    revalidatePath('/admin');
    revalidatePath(`/produit/${productId}`);
    revalidatePath('/');
    revalidatePath('/nouveautes');
    revalidatePath('/homme');
    revalidatePath('/femme');

  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    return { error: 'Impossible de mettre à jour le produit.' };
  } finally {
    redirect('/admin');
  }
}

'use server';

import { getConnection } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addReview(prevState: any, formData: FormData) {
  const author = formData.get('author') as string;
  const rating = Number(formData.get('rating'));
  const comment = formData.get('comment') as string;
  const productId = Number(formData.get('productId'));

  // Validation simple
  if (!author || !rating || !comment || !productId) {
    return { error: "Tous les champs sont requis." };
  }
  if (rating < 1 || rating > 5) {
    return { error: "La note doit être entre 1 et 5." };
  }

  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      'INSERT INTO Reviews (productId, rating, author, comment) VALUES (?, ?, ?, ?)',
      [productId, rating, author, comment]
    );
    
    // Revalider la page produit pour afficher le nouvel avis instantanément
    revalidatePath(`/produit/${productId}`);

    return { success: "Avis ajouté avec succès !" };

  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis:", error);
    return { error: "Impossible d'ajouter l'avis." };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

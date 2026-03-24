'use server';

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

type ReviewState = { error?: string; success?: string };

export async function addReview(prevState: ReviewState, formData: FormData): Promise<ReviewState> {
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

  try {
    const now = new Date().toISOString();
    const { error } = await supabase
      .from('Review')
      .insert([
        {
          productId,
          rating,
          author,
          comment,
          createdAt: now,
          updatedAt: now
        }
      ]);

    if (error) throw error;
    
    // Revalider la page produit pour afficher le nouvel avis instantanément
    revalidatePath(`/produit/${productId}`);

    return { success: "Avis ajouté avec succès !" };

  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis:", error);
    return { error: "Impossible d'ajouter l'avis." };
  }
}

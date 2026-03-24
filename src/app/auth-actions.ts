'use server';

import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function loginOrRegister(formData: FormData) {
  const name = formData.get('name') as string;
  const phoneNumber = formData.get('phoneNumber') as string;

  if (!name || !phoneNumber) {
    return { error: "Le nom et le numéro sont requis." };
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const { data: user, error: fetchError } = await supabase
      .from('User')
      .select('*')
      .eq('phoneNumber', phoneNumber)
      .maybeSingle();

    if (fetchError) throw fetchError;

    let finalUser = user;

    if (!user) {
      // Inscription automatique
      const { data: newUser, error: createError } = await supabase
        .from('User')
        .insert([{
          name,
          phoneNumber,
          cart: [],
          wishlist: []
        }])
        .select()
        .single();

      if (createError) throw createError;
      finalUser = newUser;
    }

    // Créer une session persistante via un cookie (10 ans)
    const tenYears = 10 * 365 * 24 * 60 * 60 * 1000;
    (await cookies()).set('khaya_user_session', JSON.stringify({
      id: finalUser.id,
      name: finalUser.name,
      phoneNumber: finalUser.phoneNumber
    }), {
      expires: new Date(Date.now() + tenYears),
      path: '/',
      httpOnly: false, // Accessible côté client aussi pour l'affichage immédiat
    });

    return { success: true, user: finalUser };
  } catch (error) {
    console.error("Erreur Auth:", error);
    return { error: "Erreur lors de la connexion." };
  }
}

export async function getSession() {
  const sessionCookie = (await cookies()).get('khaya_user_session');
  if (!sessionCookie) return null;
  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}

export async function logout() {
  (await cookies()).delete('khaya_user_session');
  return { success: true };
}

export async function syncUserData(userId: number, cart: any[], wishlist: any[]) {
    try {
        const { error } = await supabase
            .from('User')
            .update({
                cart,
                wishlist
            })
            .eq('id', userId);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error("Sync Error:", error);
        return { error: "Échec de la synchronisation" };
    }
}

'use server';

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function loginOrRegister(formData: FormData) {
  const name = formData.get('name') as string;
  const phoneNumber = formData.get('phoneNumber') as string;

  if (!name || !phoneNumber) {
    return { error: "Le nom et le numéro sont requis." };
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      // Inscription automatique
      user = await prisma.user.create({
        data: {
          name,
          phoneNumber,
          cart: [],
          wishlist: []
        },
      });
    }

    // Créer une session persistante via un cookie (10 ans)
    const tenYears = 10 * 365 * 24 * 60 * 60 * 1000;
    (await cookies()).set('khaya_user_session', JSON.stringify({
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber
    }), {
      expires: new Date(Date.now() + tenYears),
      path: '/',
      httpOnly: false, // Accessible côté client aussi pour l'affichage immédiat
    });

    return { success: true, user };
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
        await prisma.user.update({
            where: { id: userId },
            data: {
                cart,
                wishlist
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Sync Error:", error);
        return { error: "Échec de la synchronisation" };
    }
}

# 🎨 Guide d'Utilisation de l'Agent UI/UX Expert - Khaya Prime

## 🚀 Quick Start

Votre agent UI/UX expert est maintenant actif ! Voici comment l'utiliser efficacement :

### Commandes Rapides

```bash
# Audit complet de l'application
@ui-ux-expert "Fais un audit UX complet de l'application Khaya Prime"

# Analyse d'un composant spécifique  
@ui-ux-expert "Analyse Header.tsx pour les erreurs UI/UX et corrige-les"

# Corrections d'accessibilité
@ui-ux-expert "Corrige tous les problèmes d'accessibilité dans AddReviewForm.tsx"

# Optimisation mobile
@ui-ux-expert "Optimise l'expérience mobile de ProductCard.tsx"
```

## 🎯 Types d'Audits Disponibles

### 1. **Audit Accessibilité**
```
@ui-ux-expert "Vérifie l'accessibilité WCAG 2.1 AA de [composant/page]"
```
✅ Contraste des couleurs  
✅ Navigation clavier  
✅ ARIA labels  
✅ Structure sémantique  
✅ Support lecteurs d'écran  

### 2. **Audit Design System**
```
@ui-ux-expert "Vérifie la cohérence du design system Khaya dans [composant/page]"
```
✅ Palette de couleurs Khaya  
✅ Typographie (Montserrat/Playfair)  
✅ Espacements Tailwind  
✅ Micro-interactions  
✅ États hover/focus  

### 3. **Audit Responsive**
```
@ui-ux-expert "Optimise la responsive design de [composant/page]"
```
✅ Breakpoints Tailwind  
✅ Touch targets mobile  
✅ Navigation tactile  
✅ Formulaires adaptatifs  
✅ Images responsives  

### 4. **Audit Performance UX**
```
@ui-ux-expert "Améliore les performances UX de [composant/page]"
```
✅ Loading states  
✅ Transitions fluides  
✅ Gestion d'erreurs  
✅ Optimisation images  
✅ Micro-animations  

### 5. **Audit E-commerce**
```
@ui-ux-expert "Optimise l'expérience e-commerce de [composant/page]"
```
✅ Parcours d'achat  
✅ Trust signals  
✅ Formulaires de commande  
✅ Système d'avis  
✅ Call-to-actions  

## 🛠️ Exemples d'Utilisation Pratiques

### Scenario 1: Nouveau Développeur
```bash
# Je viens de rejoindre le projet, je veux comprendre les standards UI/UX
@ui-ux-expert "Explique-moi les standards UI/UX de Khaya Prime et fais un audit général"
```

### Scenario 2: Bug Report Mobile  
```bash
# Les utilisateurs signalent des problèmes sur mobile
@ui-ux-expert "Corrige tous les problèmes mobile dans ProductCard.tsx et ProductOrderForm.tsx"
```

### Scenario 3: Amélioration Conversion
```bash
# Je veux améliorer le taux de conversion
@ui-ux-expert "Optimise le parcours d'achat et les CTA pour améliorer la conversion"
```

### Scenario 4: Accessibilité Compliance
```bash
# Je dois respecter les standards d'accessibilité
@ui-ux-expert "Mets en conformité WCAG 2.1 AA tous les formulaires de l'application"
```

## 📊 Rapports d'Audit  

L'agent génère automatiquement :

### ✅ **Problèmes Identifiés**
- Type de problème (Critique/Majeur/Mineur)
- Impact sur l'expérience utilisateur
- Localisation exacte dans le code

### 🔧 **Corrections Appliquées**  
- Code avant/après la correction
- Explication de l'amélioration
- Tests de validation

### 📈 **Métriques d'Amélioration**
- Score d'accessibilité
- Performance UX  
- Cohérence design
- Optimisation mobile

## 🎨 Design System Khaya - Référence Rapide

### Couleurs Principales
```css
khaya-primary  → #0F172A (Slate 900) - Texte principal
khaya-secondary → #F59E0B (Amber 500) - Accents/CTA
khaya-accent   → #10B981 (Emerald 500) - Succès/Accents  
khaya-light    → #F8FAFC (Slate 50) - Backgrounds
khaya-gray     → #64748B (Slate 500) - Texte secondaire
```

### Typographie
```css
font-sans      → Montserrat (défaut)
font-playfair  → Playfair Display (titres)
```

### Standards Techniques
```css
Contraste min  → 4.5:1 (WCAG AA)
Touch targets → 44px minimum
Transitions   → 300ms max
Loading       → feedback sous 200ms
```

## 🚨 Détection Automatique des Problèmes

L'agent détecte automatiquement :

### 🔴 **Critiques (Bloquants)**
- Navigation inaccessible 
- Contraste insuffisant < 3:1
- Erreurs submit bloquantes
- Touch targets < 32px

### 🟡 **Majeurs** 
- Incohérence design system
- Manque de loading states
- Problèmes responsive
- ARIA labels manquants

### 🟢 **Mineurs**
- Micro-interactions manquantes  
- Espacements non-optimaux
- Animations pas fluides
- Polish visuel

## 💡 Conseils d'Utilisation

### ✅ **Bonnes Pratiques**
- Lancez l'audit après chaque modification importante
- Corrigez les problèmes critiques en priorité  
- Testez sur mobile après corrections
- Validez l'accessibilité avec les outils navigateur

### ⚠️ **À Éviter**
- Ne pas tester les corrections sur différents devices
- Ignorer les warnings d'accessibilité  
- Modifier les couleurs Khaya sans validation
- Oublier les états de loading/erreur

## 📞 Support & Questions

Pour toute question sur l'utilisation de l'agent :
```
@ui-ux-expert "J'ai une question sur [sujet], peux-tu m'expliquer ?"
```

L'agent peut expliquer :
- Pourquoi une correction a été appliquée
- Comment améliorer un aspect spécifique  
- Les meilleures pratiques UI/UX
- L'utilisation du design system Khaya

---

🎉 **Votre agent UI/UX expert est maintenant prêt à améliorer l'expérience utilisateur de Khaya Prime !**
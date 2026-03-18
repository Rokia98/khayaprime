# 🚀 Agent Khaya UI Fixer - Guide d'Utilisation

## ✅ Agent Finalisé et Prêt !

### **Quand l'utiliser :**
```bash
"@khaya-ui-fixer Corrige Header.tsx"
"@khaya-ui-fixer Responsive issues dans ProductCard" 
"@khaya-ui-fixer Accessibilité du formulaire"
"@khaya-ui-fixer Optimise les couleurs sur cette page"
```

### **Quand NE PAS l'utiliser :**
❌ Nouvelles fonctionnalités  
❌ Configuration serveur  
❌ Base de données  
❌ Tests unitaires  

---

## 📝 Format de Réponse Garanti

### **Exemple Concret :**

**Input :** `@khaya-ui-fixer Ce bouton ne marche pas bien sur mobile`

**Output attendu :**
```
❌ **Problème** : Touch target trop petit (32px) bloque interaction mobile

✅ **Fix** : 
<button className="min-w-[44px] min-h-[44px] px-4 py-3 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300">

💡 **Pourquoi** : 44px minimum iOS/Android standard, améliore UX tactile
```

---

## 🎯 Exemples de Prompts Efficaces

### **Corrections Spécifiques**
```
"@khaya-ui-fixer Le contraste de ce texte est trop faible"
"@khaya-ui-fixer Cette div est clickable mais pas accessible" 
"@khaya-ui-fixer Layout cassé sur mobile dans ProductOrderForm"
"@khaya-ui-fixer Optimise les transitions de ce composant"
```

### **Audits Rapides**
```
"@khaya-ui-fixer Scan AddReviewForm pour problèmes UX"
"@khaya-ui-fixer Check responsive de cette page"
"@khaya-ui-fixer Vérifie accessibilité Header"
```

---

## 🔧 Outils Préférés de l'Agent

✅ **Utilisés automatiquement :**
- `replace_string_in_file` : corrections précises
- `multi_replace_string_in_file` : corrections multiples  
- `read_file` : analyse rapide
- `runSubagent` : délégation si complexe

❌ **Évités volontairement :**
- `create_file` : pas pour nouvelles features
- `run_in_terminal` : pas pour tests

---

## 🎨 Standards Khaya Intégrés

L'agent applique automatiquement :

### **Design System**
- ✅ Couleurs : `khaya-primary`, `khaya-secondary`, etc.
- ✅ Spacing : multiples de 4 (`p-4`, `gap-4`)  
- ✅ Transitions : `duration-300` maximum

### **Accessibilité** 
- ✅ Contraste : ratio 4.5:1 minimum
- ✅ Focus : `focus:ring-2` sur tout interactif
- ✅ Sémantique : `button` jamais `div` clickable

### **Mobile-First**
- ✅ Touch targets : 44px minimum
- ✅ Responsive : `flex-col md:flex-row`
- ✅ Breakpoints : sm/md/lg/xl appropriés

---

## 🚀 Agents Complémentaires à Créer

### **Suggestions pour la Suite :**

1. **`khaya-performance`** : Optimisations Next.js/images
2. **`khaya-seo`** : Métadonnées et référencement  
3. **`khaya-database`** : Requêtes MySQL optimisées
4. **`khaya-testing`** : Tests composants React

**Intéressé par l'un de ces agents ?** Dites-moi lequel vous voulez créer !

---

🎉 **Votre agent `khaya-ui-fixer` est opérationnel et optimisé pour des corrections UI/UX efficaces !**
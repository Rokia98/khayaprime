'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Star, Send } from 'lucide-react';
import { addReview } from '@/app/actions';

interface AddReviewFormProps {
  productId: number;
}

const initialState = {
  error: null,
  success: null,
};

export default function AddReviewForm({ productId }: AddReviewFormProps) {
  const [state, formAction] = useFormState(addReview, initialState);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRatingError, setShowRatingError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setRating(0);
      setIsSubmitting(false);
      setShowRatingError(false);
    }
  }, [state.success]);

  const handleSubmit = async (formData: FormData) => {
    if (rating === 0) {
      setShowRatingError(true);
      return;
    }
    setIsSubmitting(true);
    setShowRatingError(false);
    await formAction(formData);
  };

  return (
    <div className="bg-gradient-to-br from-khaya-light to-white p-8 rounded-3xl shadow-xl border border-khaya-secondary/10 mt-8">
      <h4 className="font-playfair text-2xl font-bold text-khaya-primary mb-6 text-center">
        Partagez votre expérience
      </h4>
      <p className="text-khaya-gray text-center mb-8">
        Votre avis compte ! Aidez les autres clients en partageant votre opinion sur ce produit.
      </p>
      
      <form ref={formRef} action={handleSubmit} className="space-y-6">
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="rating" value={rating} />

        {/* Rating */}
        <div className="text-center">
          <p className="font-semibold text-khaya-primary mb-3" id="rating-label">
            Évaluez ce produit <span className="text-khaya-secondary">*</span>
          </p>
          <div 
            className="flex justify-center items-center space-x-1 mb-2"
            role="radiogroup" 
            aria-labelledby="rating-label"
            aria-describedby="rating-description"
            aria-required="true"
            aria-live="polite"
            aria-atomic="true"
          >
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  type="button"
                  key={starValue}
                  className="p-2 transition-transform duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-khaya-secondary focus:ring-offset-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                  onClick={() => {
                    setRating(starValue);
                    setShowRatingError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' && starValue < 5) setRating(starValue + 1);
                    if (e.key === 'ArrowLeft' && starValue > 1) setRating(starValue - 1);
                  }}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Noter ${starValue} étoile${starValue > 1 ? 's' : ''} sur 5`}
                  aria-pressed={starValue <= rating}
                  role="radio"
                  aria-checked={starValue === rating}
                >
                  <Star
                    size={32}
                    className={`transition-all duration-200 ${
                      starValue <= (hoverRating || rating)
                        ? 'text-khaya-secondary fill-current drop-shadow-lg'
                        : 'text-khaya-gray hover:text-khaya-secondary/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <div id="rating-description" className="sr-only">
            Utilisez les flèches ou cliquez pour sélectionner une note de 1 à 5 étoiles
          </div>
          <p className="text-sm text-khaya-gray">
            {(hoverRating || rating) > 0 && (
              <span className="text-khaya-secondary font-medium">
                {(hoverRating || rating) === 1 && "Décevant"}
                {(hoverRating || rating) === 2 && "Correct"}
                {(hoverRating || rating) === 3 && "Bien"}
                {(hoverRating || rating) === 4 && "Très bien"}
                {(hoverRating || rating) === 5 && "Excellent"}
              </span>
            )}
          </p>
        </div>

        {/* Author Name */}
        <div>
          <label htmlFor="author" className="block font-semibold text-khaya-primary mb-2">
            Votre prénom <span className="text-khaya-secondary">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Ex: Marie"
            required
            className="w-full px-4 py-3 border-2 border-khaya-light rounded-2xl focus:border-khaya-secondary focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block font-semibold text-khaya-primary mb-2">
            Votre commentaire
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            placeholder="Partagez votre expérience avec ce produit..."
            required
            className="w-full px-4 py-3 border-2 border-khaya-light rounded-2xl focus:border-khaya-secondary focus:outline-none transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm"
          />
          <p className="text-xs text-khaya-gray mt-1">
            Décrivez la qualité, le confort, la taille, etc.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={rating === 0 || isSubmitting}
          className="w-full bg-gradient-to-r from-khaya-secondary to-khaya-gold text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center space-x-3 focus:outline-none focus:ring-2 focus:ring-khaya-secondary focus:ring-offset-2 min-h-[56px]"
          aria-describedby={showRatingError ? "rating-error" : undefined}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Publication en cours...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Publier mon avis</span>
            </>
          )}
        </button>
        
        {showRatingError && (
          <div id="rating-error" className="p-3 bg-khaya-rose/10 border border-khaya-rose/20 rounded-xl" role="alert">
            <p className="text-sm text-khaya-rose text-center font-medium">
              ⭐ Veuillez sélectionner une note avant de publier votre avis
            </p>
          </div>
        )}

        {/* Messages d'état */}
        {state.success && (
          <div className="p-4 bg-khaya-accent/10 border border-khaya-accent/20 rounded-2xl">
            <p className="text-khaya-accent font-semibold text-center">
              ✨ Merci pour votre avis ! Il sera publié après modération.
            </p>
          </div>
        )}
        
        {state.error && (
          <div className="p-4 bg-khaya-rose/10 border border-khaya-rose/20 rounded-2xl">
            <p className="text-khaya-rose font-semibold text-center">
              {state.error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

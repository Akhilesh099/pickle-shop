'use client';
import { useState } from 'react';
import Button from './Button';

export default function StarRating() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return;

        // In a real app, send this to the server
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-green-50 text-green-800 p-4 rounded-md border border-green-200 mt-6">
                <h4 className="font-bold">Thank you for your review!</h4>
                <p className="text-sm mt-1">Your feedback helps us deliver 100% Quality.</p>
            </div>
        );
    }

    return (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-foreground mb-4">Leave a Review</h3>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={`text-2xl transition-colors ${star <= (hover || rating) ? 'text-accent' : 'text-gray-300'
                                }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            ★
                        </button>
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                        {rating > 0 ? `You rated ${rating} out of 5` : 'Select a rating'}
                    </span>
                </div>

                <div className="mb-4">
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Review
                    </label>
                    <textarea
                        id="review"
                        rows="4"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border"
                        placeholder="Tell us what you loved about this pickle..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                </div>

                <Button type="submit" variant="primary" className="px-8" disabled={rating === 0}>
                    Submit Review
                </Button>
            </form>
        </div>
    );
}

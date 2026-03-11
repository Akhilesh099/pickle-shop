import Image from 'next/image';
import Button from './Button';

export default function Card({ title, description, imageSrc, price, onAdd }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group">
            <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-t-2xl">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow bg-white">
                <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">{title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow font-light leading-relaxed">{description}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xl font-bold text-primary">₹{price}<span className="text-sm font-normal text-gray-500">/kg</span></span>
                    <Button variant="primary" onClick={onAdd} className="text-sm px-6 py-2 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}

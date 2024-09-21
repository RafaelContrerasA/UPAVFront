import { useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';

interface ImageGeneratorProps {
    children: JSX.Element;
    onImageGenerated: (image: string) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ children, onImageGenerated }) => {
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (componentRef.current) {
            toPng(componentRef.current, { backgroundColor: 'white' })
                .then((dataUrl) => {
                    onImageGenerated(dataUrl);
                })
                .catch((err) => {
                    console.error('Falló al generar la imagen', err);
                });
        }
    }, [onImageGenerated]);

    // Verificar si el nodo del DOM referenciado existe antes de renderizarlo
    if (!componentRef.current) {
        return null;
    }

    return <div ref={componentRef}>{children}</div>;
};

export default ImageGenerator;

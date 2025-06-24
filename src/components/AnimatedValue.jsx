import { useEffect, useState } from "react";

const AnimatedValue = ({ value, isVisible, className }) => {
    // Stan do przechowywania aktualnie wyświetlanej wartości
    const [currentValue, setCurrentValue] = useState(null);

    useEffect(() => {
        // Uruchom animację tylko, gdy element jest widoczny
        if (!isVisible) return;

        // Spróbuj wyodrębnić liczbę i ewentualny przyrostek (np. '+', '%')
        const numericMatch = value.match(/^(\d+)/);

        // Jeśli wartość nie zaczyna się od liczby, wyświetl ją bez animacji
        if (!numericMatch) {
            setCurrentValue(value);
            return;
        }

        const endValue = parseInt(numericMatch[1], 10);
        const suffix = value.substring(numericMatch[1].length);
        let startValue = 0;

        const duration = 1500; // Czas trwania animacji w ms
        const frameRate = 60; // Klatki na sekundę
        const totalFrames = Math.round(duration / 1000 * frameRate);
        const increment = endValue / totalFrames;

        const counter = setInterval(() => {
            startValue += increment;
            if (startValue >= endValue) {
                // Zakończ animację i ustaw finalną wartość
                setCurrentValue(endValue + suffix);
                clearInterval(counter);
            } else {
                // Aktualizuj wyświetlaną wartość w każdym kroku
                setCurrentValue(Math.ceil(startValue) + suffix);
            }
        }, 1000 / frameRate);

        // Wyczyść interwał, gdy komponent zostanie odmontowany
        return () => clearInterval(counter);

    }, [isVisible, value]);
    
    // Jeśli currentValue jest nullem (przed startem animacji), wyświetl 0 lub oryginalną wartość
    if (currentValue === null) {
        const numericMatch = value.match(/^(\d+)/);
        if (numericMatch) {
             const suffix = value.substring(numericMatch[1].length);
             return <p className={className}>0{suffix}</p>
        }
        return <p className={className} dangerouslySetInnerHTML={{ __html: value }}></p>;
    }


    // Użyj dangerouslySetInnerHTML, aby poprawnie renderować HTML w wartościach
    return <p className={className} dangerouslySetInnerHTML={{ __html: currentValue }}></p>;
};

export default AnimatedValue
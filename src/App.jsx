import './App.css'
import gis2 from './assets/2gis.jpg'
import {useEffect, useRef, useState} from "react";
import confetti from 'canvas-confetti';
const scriptURL = "https://script.google.com/macros/s/AKfycbxp21OeYHP5Um9ATBPdzz9hsdbiN3NrtmTfDuHm-QHFkUxBeQMOkToqTGw79Vya7ovz4A/exec";

function launchGoldenConfetti() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = {
        startVelocity: 10,
        spread: 360,
        ticks: 200,
        zIndex: 30,
        gravity: 0.3,
        colors: ['#c1ae8d', '#c1ae8d', '#FFF8DC'] // золотистые
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        confetti({
            ...defaults,
            particleCount: 5,
            origin: {
                x: randomInRange(0.1, 0.9),
                y: Math.random() - 0.2
            }
        });
    }, 250);
}

function App() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const section2Ref = useRef(null);

    useEffect(() => {
        launchGoldenConfetti();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim()) {
            alert("Атыңыз бен тегіңізді енгізіңіз!");
            return;
        }

        const fullName = `${firstName} ${lastName}`;
        const data = { name: fullName, response };

        setIsLoading(true);

        try {
            const response = await fetch(scriptURL, {
                method: "POST",
                redirect: "follow",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            });

            const result = await response.json();
            console.log("Success:", result);
            alert("Жауабыңыз қабылданды!");
            setFirstName('');
            setLastName('');
            setResponse('');
        } catch (error) {
            console.error("Error:", error);
            alert("Жіберу кезінде қате болды.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App mx-auto">
            <div className="App-content flex flex-col">
                <div className="section1 mx-auto flex flex-col justify-end h-[100vh] overflow-hidden ">
                    <div className="z-10">
                        <div className="py-10">
                            <h2 className="text-main text-[42px] text-center"></h2>
                            <h1 className="text-secondary text-shadow-lg text-[4rem] text-center">Нұрғиса & Дана</h1>
                            <h2 className="text-secondary text-shadow-lg text-[2rem] text-center">15.06.2025</h2>
                        </div>
                    </div>
                </div>
                <div ref={section2Ref}
                     className="flex flex-col space-y-14 mx-auto text-center text-main section2 py-8">
                    <div className="z-10">
                        <h1 className="text-secondary text-center mb-4">Құрметті
                            қонақтар! <br/>
                            Сіздерді <br/>
                            Нұрғиса мен Дананың<br/>
                            үйлену тойына шақырамыз! <br/></h1>
                    </div>
                    <div className="flex flex-col items-center">
                    <div className="z-10">
                            <h1 className="text-secondary">Той салтанаты</h1>
                            <h3 className="text-[28px] leading-[28px]">
                                <span>15</span> маусым <span>2025</span><br/> сағат <span>18:00</span> <br/> (жексенбі)
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center z-10">
                        <div className="mb-4">
                            <h1 className="text-secondary">Мекен-жайымыз</h1>
                            <p className="text-[20px] text-center leading-[28px]">Алматы қаласы <br/>
                                Талғар ауданы <br/>
                                Бұқтырма көшесі, 124 <br/>
                                "Bella Grand" <br/>
                                тойханасы (зал 2)
                            </p>
                        </div>
                        <a href="https://2gis.kz/almaty/geo/70000001062783287">
                            <img src={gis2}
                                 alt="2gis"
                                 className="rounded-lg w-10 h-10"/>
                        </a>
                    </div>
                    <div className="z-10">
                        <h1 className="text-secondary">Той иелері</h1>
                        <p className="text-[20px] text-center leading-[28px]">Амалбек - Алмагүл</p>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center text-main section4 mx-auto py-8 z-10">
                    <p className="text-[20px] text-center leading-[28px]">Тойға келесіз бе? <br/></p>
                    <form onSubmit={handleSubmit} className="z-10">
                        <div className="mb-4">
                            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-secondary shadow-sm transition-all"
                                    placeholder="Атыңыз"
                                />
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-secondary shadow-sm transition-all"
                                    placeholder="Тегіңіз"
                                />
                            </div>

                        </div>

                        <div className="mb-4 z-10">
                            <div>
                                <label className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        value="ИӘ, ӘРИНЕ, КЕЛЕМІН"
                                        checked={response === "ИӘ, ӘРИНЕ, КЕЛЕМІН"}
                                        onChange={(e) => setResponse(e.target.value)}
                                        className="mr-2"
                                    />
                                    ИӘ, ӘРИНЕ, КЕЛЕМІН
                                </label>
                                <label className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        value="ЖҰБАЙЫММЕН КЕЛЕМІН"
                                        checked={response === "ЖҰБАЙЫММЕН КЕЛЕМІН"}
                                        onChange={(e) => setResponse(e.target.value)}
                                        className="mr-2"
                                    />
                                    ЖҰБАЙЫММЕН КЕЛЕМІН
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="ӨКІНІШКЕ ОРАЙ, КЕЛЕ АЛМАЙМЫН"
                                        checked={response === "ӨКІНІШКЕ ОРАЙ, КЕЛЕ АЛМАЙМЫН"}
                                        onChange={(e) => setResponse(e.target.value)}
                                        className="mr-2"
                                    />
                                    ӨКІНІШКЕ ОРАЙ, КЕЛЕ АЛМАЙМЫН
                                </label>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-secondary text-white p-3 rounded hover:opacity-80"
                        >
                            {isLoading ? "Жүктелуде..." : "Жауапты жіберу"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default App

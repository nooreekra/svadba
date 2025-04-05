import './App.css';
import gis2 from './assets/2gis.jpg';
import music from './assets/wedding.mp3';
import letters from './assets/letters.png';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const scriptURL = 'https://script.google.com/macros/s/AKfycbxp21OeYHP5Um9ATBPdzz9hsdbiN3NrtmTfDuHm-QHFkUxBeQMOkToqTGw79Vya7ovz4A/exec';

function launchGoldenConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
        startVelocity: 10,
        spread: 360,
        ticks: 200,
        zIndex: 30,
        gravity: 0.3,
        colors: ['#c1ae8d', '#c1ae8d', '#FFF8DC'],
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        confetti({
            ...defaults,
            particleCount: 5,
            origin: {
                x: randomInRange(0.1, 0.9),
                y: Math.random() - 0.2,
            },
        });
    }, 250);
}

function App() {
    const { t } = useTranslation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [response, setResponse] = useState('келемін');
    const [isLoading, setIsLoading] = useState(false);
    const section2Ref = useRef(null);
    const audioRef = useRef(null);
    const [musicStarted, setMusicStarted] = useState(false);

    useEffect(() => {
        launchGoldenConfetti();

        const handleClick = () => {
            if (audioRef.current && !musicStarted) {
                audioRef.current.play().catch(err => {
                    console.warn('Автозапуск аудио не сработал:', err);
                });
                setMusicStarted(true);
                window.removeEventListener('scroll', handleClick);
            }
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim()) {
            toast.warn(t('form_required'));
            return;
        }

        const fullName = `${firstName} ${lastName}`;
        const data = { name: fullName, response };

        setIsLoading(true);

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                redirect: 'follow',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
            });

            const result = await response.json();
            console.log('Success:', result);
            toast.success(t('form_success'));
            setFirstName('');
            setLastName('');
            setResponse('келемін');
        } catch (error) {
            console.error('Error:', error);
            toast.error(t('form_error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App mx-auto">
            <audio ref={audioRef} src={music} loop />
            <div className="App-content flex flex-col">
                <div className="section1 mx-auto flex flex-col justify-between h-[100vh] overflow-hidden">
                    <div className="z-10 mt-2 ml-14 flex justify-center">
                        <img src={letters} alt="letters" className="w-44 opacity-40"/>
                    </div>
                    <div className="z-10 py-10">
                    <h1 className="text-secondary text-shadow-lg text-[3.5rem] text-center">{t('title')}</h1>
                        <h2 className="text-secondary text-shadow-lg text-[2rem] text-center">{t('date')}</h2>
                    </div>
                </div>

                <div ref={section2Ref} className="flex flex-col space-y-14 mx-auto text-center text-main section2 py-8">
                    <div className="z-10">
                        <h1 className="text-secondary text-center">{t('invitation_title')}</h1>
                        <p className="text-[20px] text-center leading-[28px] text-white">
                            {t('invitation_1')} <br/>
                            {t('invitation_2')} <br/>
                            {t('invitation_3')} <br/>
                        </p>
                    </div>

                    <div className="z-10">
                        <h1 className="text-secondary">{t('owners')}</h1>
                        <p className="text-[20px] text-center leading-[28px] text-white">{t('ownersNames')}</p>
                    </div>

                    <div className="flex flex-col items-center z-10">
                        <h1 className="text-secondary">{t('event')}</h1>
                        <h3 className="text-[20px] leading-[28px] text-white">
                            {t('event_details_1')} <br/>
                            {t('event_details_2')}
                        </h3>
                    </div>

                    <div className="flex flex-col items-center justify-center z-10">
                        <h1 className="text-secondary">{t('address_title')}</h1>
                        <p className="text-[20px] text-center leading-[28px] text-white">
                            {t('address_city')} <br/>
                            {t('address_local')} <br/>
                            {t('address_street')} <br/>
                            {t('address_rest')}
                        </p>
                        <a href="https://2gis.kz/almaty/geo/70000001062783287">
                            <img src={gis2} alt="2gis" className="rounded-lg w-10 h-10 mt-2" />
                        </a>
                    </div>
                </div>

                <div className="bg-white flex flex-col space-y-4 items-center text-center text-main section4 mx-auto py-8 px-8 z-10">
                    <p className="text-[28px] text-center">{t('form_title')}</p>

                    <form onSubmit={handleSubmit} className="z-10 flex flex-col space-y-8 w-full max-w-md">
                        <TextField
                            label={t('name')}
                            variant="outlined"
                            fullWidth
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <TextField
                            label={t('surname')}
                            variant="outlined"
                            fullWidth
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />

                        <FormControl component="fieldset">
                            <RadioGroup value={response} onChange={e => setResponse(e.target.value)}>
                                <FormControlLabel value="келемін" control={<Radio />} label={t('answer_1')} />
                                <FormControlLabel value="жұбайыммен келемін" control={<Radio />} label={t('answer_2')} />
                                <FormControlLabel value="өкінішке орай, келе алмаймын" control={<Radio />} label={t('answer_3')} />
                            </RadioGroup>
                        </FormControl>

                        <Button variant="contained" className="bg-secondary" fullWidth type="submit" disabled={isLoading}>
                            {isLoading ? t('submitting') : t('submit')}
                        </Button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
}

export default App;

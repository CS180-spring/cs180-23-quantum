import React, {useCallback} from 'react'
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import AnimateWords from '../functions/AnimateWords';
import AnimateCharacters from '../functions/AnimateCharacters';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.svg'
const Home = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
    <>
    <div className='w-100vw h-100vh overflow-hidden z-10'>
    <div className='grid place-items-center min-h-screen'>
        <div className=''>
            <img src={logo} className='mx-auto h-36' />
            <h1 className='text-4xl md:text-8xl font-medium text-white'><AnimateCharacters text="QuantumDB" /></h1>
            <motion.a whileHover={{scale:1.1}} className='flex justify-center mt-20' href='/login'><AnimateWords text="Get Started →" /></motion.a>
        </div>
    </div>
    </div>
    <div className='absolute w-100vw h-100vh overflow-hidden -z-10'>
    <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#2d3748",
                    },
                },
                fpsLimit: 240,
                interactivity: {
                    detect_on: 'window',
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 100,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        // color: '#4b3375',
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        // opacity: 1,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 100,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
    </div>
    </>
)}

export default Home

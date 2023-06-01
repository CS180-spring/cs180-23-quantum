import React, {useContext} from 'react'
import {AuthContext} from '../components/AuthContext'

const Profile = () => {
    const {setAuth} = useContext(AuthContext)

    return (
        <div>  
        <main class="profile-page dark:text-black">
            <section class="relative py-16 bg-blueGray-200">
                <div class="container mx-auto px-4">
                <div class="relative flex flex-col min-w-0 break-words dark:bg-white bg-darkPurple w-full mb-6 shadow-xl rounded-lg">
                    <div class="px-6">
                    <div class="flex flex-wrap justify-center">
                        <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div class="relative">
                            <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
                        </div>
                        </div>
                        <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        </div>
                    </div>
                    <div class="text-center mt-12">
                        <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                        Johnny Appleseed
                        </h3>
                        <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                        Database Engineer - Apple
                        </div>
                    </div>
                    <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div class="flex flex-wrap justify-center">
                        <div class="w-full lg:w-9/12 px-4">
                            <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                            
                            </p>
                        </div>
                        </div>
                        <button
                        onClick={() => {window.location.pathname = ''; setAuth('false');}}
                        class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:border-0 hover:bg-transparent hover:text-white dark:hover:text-blue-600 focus:outline-none focus:ring active:text-white"
                    >
                        Log Out
                    </button>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            </main>
    </div>
    )
}

export default Profile

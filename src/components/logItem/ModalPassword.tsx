import { Dialog, Transition } from '@headlessui/react'
import { ChangeEvent, Fragment, useState } from 'react'
import { MdAlternateEmail } from 'react-icons/md'

const ModalPassword = () => {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const [email, setEmail] = useState(''); // Estado para el valor del input

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => { // Función para manejar el cambio de valor
        setEmail(event.target.value);

    }
    return (
        <>
            <div className=" inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className=" "
                >
                    <p className="txt mt-4 mb-4 cursor-pointer font-gibson transition-all duration-100">¿Olvido su contraseña?</p>

                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-3">
                                    <Dialog.Title
                                        as="h3"
                                        className=" text-3xl font-medium leading-6 text-gray-900"
                                    >
                                        ¿Olvido su contraseña?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Introduzca su correo electronico y en breve le llegara un correo para verificar su usuario y cambiar tu contraseña
                                        </p>
                                    </div>
                                    <div className='flex mt-5 md:mt-0  flex-row  w-full'>
                                        {/* Icono */}
                                        <div className='w-[3rem] h-[3rem] bg-custom-vino flex items-center justify-center rounded-s-[5px]'>
                                            <MdAlternateEmail className='fill-custom-rosa w-[2rem] h-[2rem]' />
                                        </div>
                                        {/* Input */}
                                        <div className=' flex w-full'>
                                            <input
                                                type="email"
                                                className={`focus:outline-none w-full font-gibson text-[24px] h-[3rem]    rounded-e-[5px] border-custom-vino border-[1px] p-2 truncate shadow-custom1`}
                                                placeholder='Correo Electrónico'
                                                value={email}
                                                onChange={handleChangeEmail}
                                                required
                                            />

                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-row justify-between">
                                        <button
                                            type="button"
                                            className="p-2 ml-2 flex items-center space-x-2 rounded bg-custom-vino text-white  focus:outline-none whitespace-nowrap"
                                            onClick={closeModal}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="button"
                                            className="p-2 ml-2 flex items-center space-x-2 rounded bg-custom-vino text-white  focus:outline-none whitespace-nowrap"
                                            onClick={closeModal}
                                        >
                                            Siguiente
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalPassword
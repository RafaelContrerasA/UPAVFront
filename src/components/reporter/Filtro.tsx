import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import CustomRadioOption from './CustomRadioOption'
import DropdownFechas from './DropdownFechas'
import ButtonFilter from './ButtonFilter'

import { FaRegHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { BiHappyBeaming } from "react-icons/bi";
import { FaRegSurprise } from "react-icons/fa";
import { FaRegSadTear } from "react-icons/fa";
import { FaRegAngry } from "react-icons/fa";
import { FaRegGrinHearts } from "react-icons/fa";

const Filtro = () => {
    
    const [fechaFilter, setFechaFilter] = useState(null)
    return (

        <div className="mt-2 flex flex-col">

            <h1 className=" text-3xl py-2 font-medium leading-6 ">
                Filtros
            </h1>

            <Disclosure>
                <Disclosure.Button className="py-0 border-t">
                    <p className=' py-1 flex text-xl'>Dependencia</p>

                </Disclosure.Button>
                <Disclosure.Panel className=" pb-2  border-white">
                    <div className=' pl-2 text-sm'>
                        <Tab.Group defaultIndex={0}>


                            <Tab.List className={'flex flex-row'}>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`p-1 justify-center items-center flex w-1/2 border-white border ${selected ? 'bg-white text-custom-vino' : 'text-white'}`}
                                        >
                                            Sectorizada
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`p-1 justify-center items-center flex w-1/2 border-white border ${selected ? 'bg-white text-custom-vino' : 'text-white'}`}
                                        >
                                            Titulares
                                        </button>
                                    )}
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <div className=' p-1 justify-center items-center flex  border-white border'>
                                        Sectorizadas
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className=' p-1 justify-center items-center flex  border-white border'>
                                        Titulares
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </Disclosure.Panel>
            </Disclosure>
            <Disclosure>
                <Disclosure.Button className="py-0 border-t">
                    <p className='py-1 flex text-xl'>Fecha</p>
                </Disclosure.Button>
                <Disclosure.Panel className=" pb-2  border-white">

                    <div className='pl-2 text-sm relative '>
                        <RadioGroup value={fechaFilter} onChange={setFechaFilter}>
                            <CustomRadioOption value='Hasta'>Hasta
                                <DropdownFechas />
                            </CustomRadioOption>
                            <CustomRadioOption value='Desde'>Desde <DropdownFechas />
                            </CustomRadioOption>
                            <CustomRadioOption value='InicioFin'> <DropdownFechas /> a  <DropdownFechas /></CustomRadioOption>
                            <CustomRadioOption value='Dia'>
                                <DropdownFechas />
                            </CustomRadioOption>
                        </RadioGroup>
                    </div>
                </Disclosure.Panel>
            </Disclosure>
            <Disclosure>
                <Disclosure.Button className="py-0 border-t">
                    <p className=' py-1 flex text-xl'>Ordenar Por</p>
                </Disclosure.Button>
                <Disclosure.Panel className=" pb-2  border-white">
                    <div className=' pl-2 text-sm grid grid-rows-1 grid-cols-3 gap-1 '>
                        <ButtonFilter>Interacciones</ButtonFilter>
                        <ButtonFilter>Comentarios</ButtonFilter>
                        <ButtonFilter>Compartidas</ButtonFilter>

                    </div>
                    <div className=' pt-3 pl-2 text-sm flex justify-between '>

                        <ButtonFilter><FaRegHeart className=' w-5 h-5' /></ButtonFilter>
                        <ButtonFilter><AiOutlineLike className=' w-5 h-5' /></ButtonFilter>
                        <ButtonFilter>< FaRegGrinHearts className=' w-5 h-5' /></ButtonFilter>
                        <ButtonFilter><BiHappyBeaming className=' w-5 h-5' /></ButtonFilter>
                        <ButtonFilter><FaRegSurprise className=' w-5 h-5' /></ButtonFilter>
                        <ButtonFilter><FaRegSadTear className=' w-5 h-5' /></ButtonFilter>
                        <ButtonFilter><FaRegAngry className=' w-5 h-5' /></ButtonFilter>

                    </div>
                </Disclosure.Panel>
            </Disclosure>


        </div>
    )
}

export default Filtro
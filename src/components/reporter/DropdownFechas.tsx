import { useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const fechas = [
    { id: 1, name: 'Ultimas 24 Hrs', unavailable: false },
    { id: 2, name: 'Ultima Semana', unavailable: false },
    { id: 3, name: 'Ultimo Mes', unavailable: false },
    { id: 4, name: 'Ultimo Año', unavailable: false },

]

const DropdownFechas = () => {
    const [selectedPerson, setSelectedPerson] = useState(fechas[0])
    return (
        <div className=' relative w-fit '>
            <Listbox value={selectedPerson} onChange={setSelectedPerson} >
                <Listbox.Button className={' bg-custom-guinda py-1 px-2 rounded-full'}>{selectedPerson.name}</Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className={'absolute mt-1 w-32  bg-custom-guinda max-h-60  flex flex-col  z-50 rounded  '}>
                        {fechas.map((fecha) => (
                            <Listbox.Option
                                key={fecha.id}
                                value={fecha}
                                className={'active:bg-white active:bg-opacity-50 p-2'}
                            >
                                {fecha.name}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    )
}

export default DropdownFechas
import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import "../styles/style.css"
import { Clip } from "../types/types";

interface Props {
    isOpen: boolean,
    isClose: () => void,
    data: Clip[],
    setData: React.Dispatch<React.SetStateAction<Clip[]>>,
}

const Input = ({ isOpen, isClose, data, setData }: Props) => {
    const [clip, setClip] = useState<Clip>({
        speakerName : '',
        startTime : '',
        endTime : '',
        korSub : ''
    });

    const clearValue = () => {
        setClip({
            speakerName: '',
            startTime: '',
            endTime: '',
            korSub: ''
        })
    }

    const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        let input = e.target.value;
        input = input.replace(/[^0-9]/g, "");
        input = input.slice(0, 8);

        if (input.length > 2) {
            input = `${input.slice(0, 2)}:${input.slice(2)}`
            if (input.length > 5) {
                input = `${input.slice(0, 5)}:${input.slice(5)}`
                if (input.length > 8) {
                    input = `${input.slice(0, 8)}:${input.slice(8)}`
                }
            }
        }
        
        const value = input;

        switch (name) {
            case "startTime":
                setClip((prev) => ({...prev, startTime: value}))
                break;
            case "endTime":
                setClip((prev) => ({...prev, endTime: value}))
                break;
            
        }
    }

    const handleSubtitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case "speakerName":
                setClip((prev) => ({...prev, speakerName: value}))
                break;
            case "korSub":
                setClip((prev) => ({ ...prev, korSub: value }))
                break;
        }
        setClip((prev) => ({ ...prev, korSub: value }));
    }

    const addClip = () => {
        setData((prev) => [...prev, clip]);
        clearValue();
        isClose()
    }

    return (
        <Transition
            show={isOpen}
            enter="ease-out duration-300 transition"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                className="modal"
            >
                <button onClick={isClose}>X</button>
                <input name="seakerName" value={clip?.speakerName} onChange={handleSubtitle}></input>
                <input name="startTime" value={clip?.startTime} onChange={handleTime}></input>
                <input name="endTime" value={clip?.endTime} onChange={handleTime}></input>
                <input name="korSub" value={clip?.korSub} onChange={handleSubtitle}></input>
                <button onClick={addClip}>추가</button>
            </div>
        </Transition>
    )
}

export default Input;
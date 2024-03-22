import React, { Dispatch, SetStateAction } from 'react';
import { Slider, styled } from "@mui/material";
import { translateState } from '../../utils';

interface Props {
    onSlide: string;
    setOnSlide: Dispatch<SetStateAction<string>>;
}

function SliderOptions({ setOnSlide, onSlide }: Props) {
    const marks = [
        {
            value: 100,
            label: 'Reprovado',
          },
        {
          value: 60,
          label: 'Aprovado',
        },
        {
          value: 30,
          label: 'Em aberto',
        },
        {
            value: 0,
            label: 'nada',
        },
    ];

    function valueText(value: number | number[]) {
        switch (value) {
            case 30:
                return 'Em aberto';
            case 60:
                return 'Aprovado';
            case 100:
                return 'Reprovado';
            default: 
                return 'nada'
        }
    }

    function textToValue(value: string) {
        switch (value) {
            case 'open':
                return 30;
            case 'approved':
                return 60;
            case 'disapproved':
                return 100;
            default: 
                return 0
        }
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setOnSlide(translateState(valueText(newValue)));
    };

    return (
        <SliderButton
            defaultValue={textToValue(onSlide)}
            getAriaValueText={valueText}
            aria-labelledby="discrete-slider-restrict"
            onChange={handleChange}
            step={null}
            marks={marks}
        />
    );
};

const SliderButton = styled(Slider)(() => ({
    width: '340px',
    color: '#b8d9dd',
    height: '8px',
    "& .MuiSlider-thumb": {
      backgroundColor: '#0B7077',
    },
    "& .MuiSlider-rail": {
      color: '#b8d9dd',
      height: '15px'
    },
    "& .MuiSlider-markLabel": {
        fontSize: "16px",
        color: "#0B7077",
    },
    '& .MuiSlider-markLabel[data-index="3"]': {
        transform: "translateX(-0%)"
    },
    '& .MuiSlider-markLabel[data-index="0"]': {
        transform: "translateX(-100%)"
    },
}));

export default SliderOptions;

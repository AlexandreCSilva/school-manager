import React, { Dispatch, SetStateAction } from 'react';
import { Slider, styled } from "@mui/material";

interface Props {
    setOnSlide: Dispatch<SetStateAction<string>>;
}

function SliderOptions({ setOnSlide }: Props) {
    const marks = [
        {
          value: 50,
          label: 'Aprovado',
        },
        {
          value: 100,
          label: 'Reprovado',
        },
        {
          value: 0,
          label: 'Em aberto',
        },
    ];

    function valuetext(value: number | number[]) {
        switch (value) {
            case 50:
                return 'Aprovado';
            case 100:
                return 'Reprovado';
            default: 
                return 'Em aberto'
        }
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setOnSlide(valuetext(newValue));
    };

    return (
        <SliderButton
            defaultValue={0}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-restrict"
            onChange={handleChange}
            step={null}
            marks={marks}
        />
    );
};

const SliderButton = styled(Slider)(() => ({
    width: '250px',
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
    '& .MuiSlider-markLabel[data-index="2"]': {
        transform: "translateX(0%)"
    },
    '& .MuiSlider-markLabel[data-index="1"]': {
        transform: "translateX(-100%)"
    },
}));

export default SliderOptions;

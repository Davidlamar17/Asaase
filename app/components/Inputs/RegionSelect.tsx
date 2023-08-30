'use client';

import Select from 'react-select';

import useRegions from '@/app/hooks/useRegions';


export type RegionSelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

   interface RegionSelectProps {
    value?: RegionSelectValue;
    onChange: (value: RegionSelectValue) => void;
   }

const RegionSelect: React.FC<RegionSelectProps> = ({
    value,
    onChange
}) => {
     const { getAll } = useRegions();

    return (
        <div>
          <Select
            placeholder="Anywhere"
            isClearable
            options={getAll()}
            value={value}
             onChange={(value) => onChange(value as RegionSelectValue)}
             formatOptionLabel={(option: any) => (
                <div className='flex flex-row items-center gap-3'>
                 <div>{option.flag}</div>
                  <div>
                    {option.label},
                    <span className='text-neutral-500 ml-1'>
                        {option.region}
                    </span>
                    </div>
                    </div>
             )} 
             classNames={{
                control: () => 'p-3 border-2',
                input: () => 'text-lg',
                option: () => 'text-lg'
             }}
             theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#ffe4e6'
                }
             })}
            />
        </div>
    );
}

export default RegionSelect;
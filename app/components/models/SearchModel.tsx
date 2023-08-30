'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import useSearchModel from "@/app/hooks/useSearchModel";
import dynamic from "next/dynamic"; 
import Model from "./Model";
import RegionSelect, { RegionSelectValue } from "../Inputs/RegionSelect";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../Inputs/Calendar";
import Counter from "../Inputs/Counter";
import { Range } from "react-date-range";


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModel = () => {
    const router = useRouter();
    const params = useSearchParams();
const searchModel = useSearchModel();

const [location, setLocation] = useState<RegionSelectValue>()
const [step, setStep] = useState(STEPS.LOCATION);
const [guestCount, setGuestCount] = useState(1);
const [roomCount, setRoomCount] = useState(1);
const [bathroomCount, setBathroomCount] = useState(1);
const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date (),
    endDate: new Date(),
    key: 'selection'
});

  const Map = useMemo(() => dynamic(() => import ('../Map'), {
    ssr: false,
  }), [location]);

  const onBack = useCallback(() => {
   setStep((value) => value-1);
  }, []);

 const onNext = useCallback(() => {
    setStep((value) => value + 1);
 }, []);

 const onSubmit = useCallback(async () => {
  if (step !== STEPS.INFO) {
    return onNext(); 
  }

   let currentQuery = {};

   if (params) {
    currentQuery = queryString.parse(params.toString());
   }

   const updatedQuery: any = {
    ...currentQuery,
    locationValue: location?.value,
    guestCount,
    roomCount,
    bathroomCount
   };

   if (dateRange.startDate) {
    updatedQuery.startDate = formatISO(dateRange.startDate);
   }
    
    if (dateRange.endDate) {
         updatedQuery.endDate = formatISO(dateRange.endDate);
    }

     const url = queryString.stringifyUrl({
        url: '/',
        query: updatedQuery
     }, {skipNull:true});
        
       setStep(STEPS.LOCATION);
       searchModel.onClose();

       router.push(url);

 }, [
        step,
        searchModel,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        params
 ]);

 const actionLabel = useMemo(() => {
 if (step ==STEPS.INFO) {
    return 'Search';
 }

   return 'Next';
 }, [step]);

 const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.LOCATION) {
        return undefined;
    }

     return 'Back';
 }, [step]);

 let bodyContent = ( 
    <div className="flex flex-col gap-8">
        <Heading 
        title="Where do you want to go?"
        subtitle="Find the perfect location"
        />
        <RegionSelect 
        value={location}
        onChange={(value) =>
        setLocation(value as RegionSelectValue) 
        }
        />
        <hr />
        <Map center={location?.latlng} />
    </div>
 )


if (step == STEPS.DATE) {
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title="When do you want to go?"
            subtitle="Make sure everyone is free"
            />
            <Calendar 
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
            />
        </div>
    )
}

 if (step == STEPS.INFO) {
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
             title="More information"
              subtitle="Find your perfect place"
            />
            <Counter
              title="Guests"
              subtitle="How many Guests are coming"
              value={guestCount}
              onChange={(value) => setGuestCount(value)}
            />
               <Counter
              title="Rooms"
              subtitle="How many rooms do you need?"
              value={roomCount}
              onChange={(value) => setRoomCount(value)}
            />
               <Counter
              title="Bathrooms"
              subtitle="How many bathrooms do you need"
              value={bathroomCount}
              onChange={(value) => setBathroomCount(value)}
            />
        </div>
    )
 }


    return (
        <Model 
        isOpen={searchModel.isOpen}
        onClose={searchModel.onClose}
        onSubmit={onSubmit}
        title="Filters"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step == STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}
        />
    );
}

export default SearchModel;
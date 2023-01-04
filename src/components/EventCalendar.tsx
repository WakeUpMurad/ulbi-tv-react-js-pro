import React, {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formantDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    function dateCellRender(value: Moment) {
        const formattedData = formantDate(value.toDate());
        const currentDayEvents = props.events.filter(ev => ev.date === formattedData);
        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>
                        {ev.description}
                    </div>
                )}
            </div>
        );
    }
    return (
        <Calendar dateCellRender={dateCellRender}/>
    );
};

export default EventCalendar;

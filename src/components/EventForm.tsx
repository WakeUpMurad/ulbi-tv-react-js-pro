import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select, } from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formantDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)
    const {user} = useTypedSelector(state => state.auth)

    const submitEventForm = () => {
        props.submit({...event, author: user.username})
    }
    const selectOptions = props.guests.map(guest => (
        {value: guest.username, label: guest.username}
    ))

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formantDate(date.toDate())})
        }
    }


    return (
        <Form onFinish={submitEventForm}>
            <Form.Item
                label={"Название события"}
                name={"description"}
                rules={[rules.required()]}

            >
                <Input
                    value={event.description}
                    onChange={e => setEvent({...event, description: e.target.value})}
                />
            </Form.Item>
            <Form.Item
                label={"Дата события"}
                name={"date"}
                rules={[rules.required(), rules.isDateAfter('Нельзя создать событие в прошлом')]}

            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                initialValue={"Выберите гостя"}
                name={"гость"}
                rules={[rules.required()]}

            >
                <Select
                    onChange={(guest: string) => setEvent({...event, guest})}
                    options={selectOptions}
                />
            </Form.Item>
            <Row justify={"end"}>
                <Form.Item>
                    <Button type={"primary"} htmlType={"submit"}>
                        Создать
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;

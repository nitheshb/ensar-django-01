import { useEffect, useState } from 'react'

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

 function CustomModal({ activeItem, toggle, onSave, setActiveItem }: {activeItem: any,toggle:any,onSave:any, setActiveItem:any  }){


    useEffect(() => {
        setActiveItem(activeItem);
    }, [activeItem]);


    const handleChange = (e: { target: { type?: any; checked?: any; name?: any; value?: any; }; }) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItemNew = { ...activeItem, [name]: value };

        setActiveItem(activeItemNew);
    };




    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="todo-title">Title</Label>
                        <Input
                            type="text"
                            id="todo-title"
                            name="title"
                            value={activeItem.title}
                            onChange={handleChange}
                            placeholder="Enter Todo Title" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="todo-description">Description</Label>
                        <Input
                            type="text"
                            id="todo-description"
                            name="description"
                            value={activeItem.description}
                            onChange={handleChange}
                            placeholder="Enter Todo description" />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                name="completed"
                                checked={activeItem.completed}
                                onChange={handleChange} />
                            Completed
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="success"
                    onClick={() => onSave(activeItem)}
                >
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );

}

export default CustomModal
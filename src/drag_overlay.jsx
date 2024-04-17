import {
    DragDropProvider,
    DragDropSensors,
    DragOverlay,
    createDraggable,
    createDroppable,
} from "@thisbeyond/solid-dnd";
import { createSignal, Show } from "solid-js";

const Draggable = () => {
    const draggable = createDraggable(1);
    return (
        <div
            use:draggable
            class="draggable"
            classList={{ "opacity-25": draggable.isActiveDraggable }}
        >
            Draggable
        </div>
    );
};

const Droppable = (props) => {
    const droppable = createDroppable(1);
    return (
        <div
            use:droppable
            class="droppable"
            classList={{ "bg-blue-100": droppable.isActiveDroppable }}
        >
            Droppable.
            {props.children}
        </div>
    );
};

export const DndExample = () => {
    const [where, setWhere] = createSignal("outside");

    const onDragEnd = ({ droppable }) => {
        if (droppable) {
            setWhere("inside");
        } else {
            setWhere("outside");
        }
    };

    return (
        <DragDropProvider onDragEnd={onDragEnd}>
            <DragDropSensors />
            <div class="flex flex-col items-center gap-4">
                drag_overlay
                <Show when={where() === "outside"}>
                    <Draggable />
                </Show>
                <Droppable>
                    <Show when={where() === "inside"}>
                        <Draggable />
                    </Show>
                </Droppable>
            </div>
            <DragOverlay>
                <div class="draggable">Drag Overlay!</div>
            </DragOverlay>
        </DragDropProvider>
    );
};
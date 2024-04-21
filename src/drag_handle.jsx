import {
    DragDropProvider,
    DragDropSensors,
    createDraggable,
    createDroppable,
    transformStyle,
} from "@thisbeyond/solid-dnd";

const Draggable = () => {
    const draggable = createDraggable(1);
    return (
        <div
            ref={draggable.ref}
            style={transformStyle(draggable.transform)}
            class="draggable-container"
        >
            <div class="content">Draggable</div>
            <div class="cursor-move" {...draggable.dragActivators}>
                ✪
            </div>
        </div>
    );
};

const Droppable = () => {
    const droppable = createDroppable(1);
    return (
        <div
            ref={droppable.ref}
            class="droppable min-h-60"
            classList={{ "!droppable-accept": droppable.isActiveDroppable }}
        >
            Droppable.
        </div>
    );
};

export const DndExample = () => {
    let draggable_container_ref;

    const onDragEnd = ({ draggable, droppable }) => {
        if (droppable) {
            droppable.node.append(draggable.node);
        } else {
            draggable_container_ref.append(draggable.node);
        }
    };

    return (
        <DragDropProvider onDragEnd={onDragEnd}>
            <DragDropSensors />
            <div class="flex flex-col gap-6 items-center">
                drag_handle
                <div ref={draggable_container_ref}>
                    <Draggable />
                </div>
                <Droppable />
            </div>
        </DragDropProvider>
    );
};
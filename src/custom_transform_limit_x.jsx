import {
    DragDropProvider,
    DragDropSensors,
    createDraggable,
    useDragDropContext,
    DragDropDebugger
} from "@thisbeyond/solid-dnd";

const Draggable = () => {
    const draggable = createDraggable(1);
    return (
        <div use:draggable class="draggable">
            Draggable
        </div>
    );
};

const ConstrainDragAxis = () => {
    const [, { onDragStart, onDragEnd, addTransformer, removeTransformer }] = useDragDropContext();

    const transformer = {
        id: "constrain-x-axis",
        order: 100,
        callback: (transform) => ({ ...transform, x: 0 }),
    };

    onDragStart(({ draggable }) => {
        addTransformer("draggables", draggable.id, transformer);
    });

    onDragEnd(({ draggable }) => {
        removeTransformer("draggables", draggable.id, transformer.id);
    });

    return <></>;
};

export const DndExample = () => {
    return (
        <DragDropProvider>
            {/* <DragDropDebugger /> */}
            <DragDropSensors />
            <ConstrainDragAxis />
            <div class="flex flex-col items-center gap-6">
                custom_transform_limit_x
                <div class="min-h-15">
                    <Draggable />
                </div>
            </div>
        </DragDropProvider>
    );
};
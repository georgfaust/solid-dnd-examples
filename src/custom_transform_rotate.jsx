import {
    DragDropProvider,
    DragDropSensors,
    createDraggable,
    transformStyle,
    DragDropDebugger
} from "@thisbeyond/solid-dnd";

const Draggable = () => {
    const draggable = createDraggable(1);

    const customTransformStyle = (transform) => {
        const sign = transform.x >= 0 ? "+" : "-";
        return {
            translate: `${transform.x}px ${transform.y}px 0px`,
            rotate: `z ${draggable.isActiveDraggable ? `${sign}15deg` : "0deg"}`,
        };
    };

    return (
        <div
            class="draggable"
            ref={draggable.ref}
            style={customTransformStyle(draggable.transform)}
            {...draggable.dragActivators}
        >
            Draggable
        </div>
    );
};

export const DndExample = () => {
    return (
        <DragDropProvider>
            {/* <DragDropDebugger /> */}
            <DragDropSensors />
            <div class="flex flex-col items-center gap-6">
                custom_transform_rotate
                <div class="min-h-15">
                    <Draggable />
                </div>
            </div>
        </DragDropProvider>
    );
};
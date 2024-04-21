import {
    useDragDropContext,
    DragDropProvider,
    DragDropSensors,
    DragOverlay,
    SortableProvider,
    createSortable,
    closestCenter,
    DragDropDebugger
} from "@thisbeyond/solid-dnd";
import { createSignal, For } from "solid-js";

const Sortable = (props) => {
    const sortable = createSortable(props.item);
    const [state] = useDragDropContext();
    return (
        <div
            use:sortable
            class="draggable"
            classList={{
                "opacity-25": sortable.isActiveDraggable,
                "transition-transform": !!state.active.draggable,
            }}
        >
            {props.item}
        </div>
    );
};

export const DndExample = () => {
    const [items, setItems] = createSignal([1, 2, 3]);
    const [activeItem, setActiveItem] = createSignal(null);
    const ids = () => items();

    const onDragStart = ({ draggable }) => setActiveItem(draggable.id);

    const onDragEnd = ({ draggable, droppable }) => {
        if (draggable && droppable) {
            console.log(draggable.id, droppable.id)
            const currentItems = ids();
            const fromIndex = currentItems.indexOf(draggable.id);
            const toIndex = currentItems.indexOf(droppable.id);
            if (fromIndex !== toIndex) {
                const updatedItems = currentItems.slice();
                updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
                setItems(updatedItems);
            }
        }
    };

    return (
        <DragDropProvider
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            collisionDetector={closestCenter}
        >
            {/* <DragDropDebugger /> */}
            <DragDropSensors />
            <SortableProvider ids={ids()}>
                <div class="flex flex-col w-80 gap-4">
                    <For each={items()}>{(item) => <Sortable item={item} />}</For>
                </div>
            </SortableProvider>
            <DragOverlay>
                <div class="draggable">{activeItem()}</div>
            </DragOverlay>
        </DragDropProvider>
    );
};
import {
  DragDropProvider,
  DragDropSensors,
  createDraggable,
  createDroppable,
  transformStyle,
  DragDropDebugger
} from "@thisbeyond/solid-dnd";
import { createSignal, Show } from "solid-js";

const Draggable = () => {
  const draggable = createDraggable(1);
  return (
    <div
      ref={draggable.ref}
      style={transformStyle(draggable.transform)}
      {...draggable.dragActivators}
      class="draggable">
      Draggable
    </div>
  );
};

const Droppable = (props) => {
  const droppable = createDroppable(1);
  return (
    <div
      ref={droppable.ref}
      class="droppable"
      classList={{ "bg-blue-100": droppable.isActiveDroppable }}
    >
      {props.children}
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
      {/* <DragDropDebugger /> */}
      <DragDropSensors />
      <div class="flex flex-col items-center gap-4">
        basic_without_use
        <div ref={draggable_container_ref}>
          <Draggable />
        </div>
        <Droppable />
      </div>
    </DragDropProvider>
  );
};
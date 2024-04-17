import {
  DragDropProvider,
  DragDropSensors,
  createDraggable,
  createDroppable,
  DragDropDebugger
} from "@thisbeyond/solid-dnd";
import { createSignal, Show } from "solid-js";

const Draggable = () => {
  const draggable = createDraggable(1);
  return (
    <div
      use:draggable
      class="draggable">
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
      {/* <DragDropDebugger /> */}
      <DragDropSensors />
      <div class="flex flex-col items-center gap-4">
        basic
        <Show when={where() === "outside"}>
          <Draggable />
        </Show>
        <Droppable>
          <Show when={where() === "inside"}>
            <Draggable />
          </Show>
        </Droppable>
      </div>
    </DragDropProvider>
  );
};
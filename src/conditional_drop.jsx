import {
  DragDropProvider,
  useDragDropContext,
  DragDropSensors,
  createDraggable,
  createDroppable,
  DragDropDebugger
} from "@thisbeyond/solid-dnd";

const Draggable = (props) => {
  const draggable = createDraggable(props.id, { type: props.type });
  return (
    <div use:draggable class="draggable">
      {`Draggable type '${props.type}'`}
    </div>
  );
};

const Droppable = (props) => {
  const droppable = createDroppable(props.id, { type: props.type });

  const [state] = useDragDropContext();

  const activeClass = () => {
    if (droppable.isActiveDroppable) {
      if (state.active.draggable?.data.type === props.type) {
        return "bg-blue-100";
      } else {
        return "bg-red-100";
      }
    }
    return "";
  };

  return (
    <div use:droppable class={`droppable ${activeClass()}`}>
      Droppable
      <br />
      {`accepts type '${props.type}'`}
    </div>
  );
};

export const DndExample = () => {
  let ref;

  const onDragEnd = ({ draggable, droppable }) => {
    if (droppable) {
      if (draggable.data.type === droppable.data.type) {
        droppable.node.append(draggable.node);
      }
    } else {
      ref.append(draggable.node);
    }
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      {/* <DragDropDebugger /> */}
      <DragDropSensors />
      <div class="flex flex-col items-center gap-6">
        conditional_drop
        <div ref={ref} class="min-h-15 flex flex-wrap gap-5 justify-center">
          <Draggable id={1} type="a" />
          <Draggable id={2} type="b" />
        </div>
        <div class="flex flex-col gap-4">
          <Droppable id={1} type="a" />
          <Droppable id={2} type="b" />
        </div>
      </div>
    </DragDropProvider>
  );
};
import {
  DragDropProvider,
  DragDropSensors,
  createDraggable,
  DragOverlay,
  DragDropDebugger
} from "@thisbeyond/solid-dnd";

const Draggable = (props) => {
  const draggable = createDraggable(props.id);
  return (
    <div
      use:draggable
      class="draggable absolute"
      classList={{ "opacity-25": draggable.isActiveDraggable }}
      style={{ top: 200, left: (props.id === 1 ? 50 : 200) + "px" }}
    >
      Draggable {props.id}
    </div>
  );
};

export const DndExample = () => {
  let transform = { x: 0, y: 0 };

  const onDragMove = ({ overlay }) => {
    if (overlay) {
      transform = { ...overlay.transform };
    }
  };

  const onDragEnd = ({ draggable }) => {
    const node = draggable.node;
    node.style.setProperty("top", node.offsetTop + transform.y + "px");
    node.style.setProperty("left", node.offsetLeft + transform.x + "px");
  };

  return (
    <DragDropProvider onDragMove={onDragMove} onDragEnd={onDragEnd}>
      {/* <DragDropDebugger /> */}
      <DragDropSensors />
      arbitrary_drag_move
      <Draggable id={1} />
      <Draggable id={2} />
      <DragOverlay>
        {(draggable) => <div class="draggable">Draggable {draggable.id}</div>}
      </DragOverlay>
    </DragDropProvider>
  );
};
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  createDraggable,
  createDroppable,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import { batch, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

const Draggable = (props) => {
  const draggable = createDraggable(props.item);
  return (
    <div
      use:draggable
      class="flex items-center justify-center p-4 bg-sky-200"
      classList={{ "opacity-25": draggable.isActiveDraggable }}
    >
      {props.item}
    </div>
  );
};

const Column = (props) => {
  const droppable = createDroppable(props.id);
  return (
    <div use:droppable class="flex flex-col gap-4 bg-sky-100 w-40">
      <For each={props.items}>{(item) => <Draggable item={item} />}</For>
    </div>
  );
};

export const DndExample = () => {
  const [containers, setContainers] = createStore({
    A: [1, 2, 3],
    B: [4, 5, 6],
  });

  const containerIds = () => Object.keys(containers);

  const isContainer = (id) => containerIds().includes(id);

  const getContainer = (id) => {
    for (const [key, items] of Object.entries(containers)) {
      if (items.includes(id)) {
        return key;
      }
    }
  };

  const closestContainerOrItem = (draggable, droppables, context) => {
    const closestContainer = closestCenter(
      draggable,
      droppables.filter((droppable) => isContainer(droppable.id)),
      context
    );
    if (closestContainer) {
      const containerItemIds = containers[closestContainer.id];
      const closestItem = closestCenter(
        draggable,
        droppables.filter((droppable) =>
          containerItemIds.includes(droppable.id)
        ),
        context
      );
      if (!closestItem) {
        return closestContainer;
      }

      if (getContainer(draggable.id) !== closestContainer.id) {
        const isLastItem =
          containerItemIds.indexOf(closestItem.id) ===
          containerItemIds.length - 1;

        if (isLastItem) {
          const belowLastItem =
            draggable.transformed.center.y > closestItem.transformed.center.y;

          if (belowLastItem) {
            return closestContainer;
          }
        }
      }
      return closestItem;
    }
  };

  const move = (draggable, droppable, onlyWhenChangingContainer = true) => {
    const draggableContainer = getContainer(draggable.id);
    const droppableContainer = isContainer(droppable.id)
      ? droppable.id
      : getContainer(droppable.id);

    if (
      draggableContainer != droppableContainer ||
      !onlyWhenChangingContainer
    ) {
      const containerItemIds = containers[droppableContainer];
      let index = containerItemIds.indexOf(droppable.id);
      if (index === -1) index = containerItemIds.length;

      batch(() => {
        setContainers(draggableContainer, (items) =>
          items.filter((item) => item !== draggable.id)
        );
        setContainers(droppableContainer, (items) => [
          ...items.slice(0, index),
          draggable.id,
          ...items.slice(index),
        ]);
      });
    }
  };

  const onDragOver = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      move(draggable, droppable);
    }
  };

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      move(draggable, droppable, false);
    }
  };

  return (
    <div class="flex flex-col flex-1 mt-5 self-stretch">
      <DragDropProvider
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        collisionDetector={closestContainerOrItem}
      >
        <DragDropSensors />
        <div class="flex flex-row gap-4 bg-sky-50">
          <For each={containerIds()}>
            {(key) => <Column id={key} items={containers[key]} />}
          </For>
        </div>
        <DragOverlay>
          {(draggable) => <div class="flex items-center justify-center p-4 bg-red-300">{draggable.id}</div>}
        </DragOverlay>
      </DragDropProvider>
    </div>
  );
};
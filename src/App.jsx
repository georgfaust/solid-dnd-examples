import { createSignal } from "solid-js";
import { DndExample as Basic } from './basic'
import { DndExample as BasicWithoutUse } from './basic_without_use'
import { DndExample as DragOverlay } from './drag_overlay'
import { DndExample as ConditionalDrop } from './conditional_drop'
import { DndExample as DragHandle } from './drag_handle'
import { DndExample as CustomTransformRotate } from './custom_transform_rotate'
import { DndExample as CustomTransformLimitX } from './custom_transform_limit_x'
import { DndExample as ArbitraryDragMove } from './arbitrary_drag_move'
import { DndExample as SortableListVertical } from './sortable_list_vertical'
import { DndExample as MultipleLists } from './multiple_lists'

const options = {
  "Basic": Basic,
  "Basic Without Use": BasicWithoutUse,
  "Drag Overlay": DragOverlay,
  "Conditional Drop": ConditionalDrop,
  "Drag Handle": DragHandle,
  "Custom Transform Rotate": CustomTransformRotate,
  "Custom Transform LimitX": CustomTransformLimitX,
  "Arbitrary Drag Move": ArbitraryDragMove,
  "Sortable List Vertical": SortableListVertical,
  "Multiple Lists": MultipleLists
}

function App() {
  const [selected, setSelected] = createSignal("Basic");

  return (
    <>
      <div class="p-20">
        <div className="max-w-64 mx-auto mb-12">
          <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={selected()} onInput={e => setSelected(e.currentTarget.value)}>
            <For each={Object.keys(options)}>{
              color => <option value={color}>{color}</option>
            }</For>
          </select>
        </div>
        <Dynamic component={options[selected()]} />
      </div>
    </>
  );
}

export default App;

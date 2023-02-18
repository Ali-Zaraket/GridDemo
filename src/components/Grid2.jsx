import { Responsive, WidthProvider } from "react-grid-layout";
import _ from "lodash";
import "../styles/grid.css"
import { useEffect, useState } from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

const BREAKPOINTS = { lg: 1280, md: 992, sm: 768, xs: 450, xxs: 0 }
const COLS = { lg: 4, md: 4, sm: 4, xs: 4, xxs: 1 }
const GAP = 12


export default function Grid2({ editable, turnOffEditing }) {
  const [layouts, setLayouts] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved_layouts = localStorage.getItem("layouts")
    if(saved_layouts) {
      setLayouts(JSON.parse(saved_layouts))
    } else {
      setLayouts({
        lg: _.map(_.range(0, 5), function (item, i) {
          var y = Math.ceil(Math.random() * 4) + 1;
          return {
            x: (_.random(0, 1) * 2) % 12,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: 2,
            i: i.toString(),
          };
        })
      })
    }
    setLoading(false)
  }, []);


  const onLayoutChange = (layout, layouts) => {
    setLayouts({ ...layouts });
  };

  const generateDOM = () => {
    return _.map(layouts.lg, function (l, i) {
      return (
        <div key={i} className="card" >
          <span className="text">{i}</span>
        </div>
      );
    });
  };

  function saveLayout() {
    if(!layouts) return
    localStorage.setItem("layouts", JSON.stringify(layouts))
    alert("your layout has been saved in local storage.")
    turnOffEditing()
  }

  if(loading) {
    return <div>loading..</div>
  }

  if(!layouts) return

  return (
    <div className="mb-4">
      { editable && <button className="save-layout-btn" onClick={saveLayout}>Save</button> }
      <ResponsiveGridLayout
        layouts={layouts}
        useCSSTransforms={true}
        compactType={"vertical"}
        preventCollision={true}
        onLayoutChange={onLayoutChange}
        breakpoints={BREAKPOINTS}
        cols={COLS}
        isDroppable
        isResizable={editable}
        isDraggable={editable}
        margin={[GAP, GAP]}
      >
        {generateDOM()}
      </ResponsiveGridLayout>
    </div>
  );
}

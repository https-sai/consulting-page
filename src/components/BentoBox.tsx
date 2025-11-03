import React from "react";

export default function BentoBox() {
  return (
    <section className="min-h-[100vh] px-50">
      <div className="h-100 grid grid-cols-3 grid-rows-3 gap-4 bg-amber-100 p-4">
        <div className="row-span-2 rounded-md border border-black/50">1</div>
        <div className="row-span-2 col-start-2 row-start-2 rounded-md border border-black/50">
          2
        </div>
        <div className="col-start-2 row-start-1 rounded-md border border-black/50">
          3
        </div>
        <div className="col-start-1 row-start-3 rounded-md border border-black/50">
          4
        </div>
        <div className="row-span-2 col-start-3 row-start-1 rounded-md border border-black/50">
          5
        </div>
        <div className="col-start-3 row-start-3 rounded-md border border-black/50">
          6
        </div>
      </div>
    </section>
  );
}

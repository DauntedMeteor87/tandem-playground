// Source: Wireframe 0.2 — stepBudget() + sliderRow() + breakdownHtml() in
// screens.js. Step 5 of 9: itemized dials (distance/gas, campsite, permits,
// misc), an optional food line (quick estimate vs itemized), optional injury
// insurance, and a live per-person breakdown. All math is the ported
// budgetBreakdown()/budgetTotal() in data.ts; every drag re-renders and the
// totals recompute — no imperative DOM like the wireframe needed.
"use client";

import type { ReactNode } from "react";
import {
  budgetBreakdown,
  budgetTotal,
  foodPerPerson,
  type Adventure,
} from "@/lib/data";
import { IconPlus, IconX } from "@/components/icons";
import { advPatch, budgetPatch, type StepProps } from "./StepProps";

function SliderRow({
  label,
  valueText,
  value,
  min,
  max,
  step = 1,
  onChange,
  padless,
}: {
  label: string;
  valueText: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  padless?: boolean;
}) {
  return (
    <div
      className="budget-row"
      style={padless ? { paddingLeft: 0, paddingRight: 0 } : undefined}
    >
      <div className="budget-row__head">
        <span className="budget-row__name">{label}</span>
        <span className="budget-row__val">{valueText}</span>
      </div>
      <input
        className="slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
    </div>
  );
}

export function BudgetStep({ adv, dispatch }: StepProps) {
  const patch = advPatch(adv, dispatch);
  const setBudget = budgetPatch(adv, dispatch);
  const b = adv.budget;

  return (
    <>
      <div className="wiz__eyebrow">Step 5 of 9</div>
      <h1 className="wiz__title">Budget</h1>
      <p className="wiz__hint">
        Drag each dial — the total updates live. This is exactly what members
        see as the cost breakdown.
      </p>

      <div className="divlabel">Group &amp; travel</div>
      <div className="list">
        <SliderRow
          label="Capacity"
          valueText={`${adv.capacity} ppl`}
          value={adv.capacity}
          min={2}
          max={40}
          onChange={(v) => patch({ capacity: v })}
        />
        <SliderRow
          label="Cars needed"
          valueText={`${adv.cars} cars`}
          value={adv.cars}
          min={0}
          max={12}
          onChange={(v) => patch({ cars: v })}
        />
        <SliderRow
          label="Distance (round trip, mi)"
          valueText={`${b.distance} mi`}
          value={b.distance}
          min={0}
          max={b.distanceMax}
          step={5}
          onChange={(v) => setBudget({ distance: v })}
        />
      </div>

      <div className="divlabel">
        Group costs{" "}
        <span className="opt">split evenly across capacity</span>
      </div>
      <div className="list">
        <SliderRow
          label="Campsite total"
          valueText={`$${b.campsiteTotal}`}
          value={b.campsiteTotal}
          min={0}
          max={b.campsiteMax}
          step={5}
          onChange={(v) => setBudget({ campsiteTotal: v })}
        />
        <SliderRow
          label="Permits total"
          valueText={`$${b.permitsTotal}`}
          value={b.permitsTotal}
          min={0}
          max={b.permitsMax}
          step={5}
          onChange={(v) => setBudget({ permitsTotal: v })}
        />
        <SliderRow
          label="Misc costs"
          valueText={`$${b.miscTotal}`}
          value={b.miscTotal}
          min={0}
          max={b.miscMax}
          step={5}
          onChange={(v) => setBudget({ miscTotal: v })}
        />
      </div>

      <div className="divlabel">Food</div>
      <div className="list">
        <div className="togglerow">
          <span className="row__title">Food included in the cost</span>
          <button
            type="button"
            className={`toggle ${b.foodOn ? "on" : ""}`}
            onClick={() => setBudget({ foodOn: !b.foodOn })}
            aria-pressed={b.foodOn}
            aria-label="Food included in the cost"
          >
            <span className="knob" />
          </button>
        </div>
        {b.foodOn ? (
          <div className="pad" style={{ padding: "0 var(--tc-s4) 14px" }}>
            <div className="chiprow mt3">
              <button
                type="button"
                className={`chip ${b.foodMode === "estimate" ? "on" : ""}`}
                onClick={() => setBudget({ foodMode: "estimate" })}
              >
                Quick estimate
              </button>
              <button
                type="button"
                className={`chip ${b.foodMode === "itemized" ? "on" : ""}`}
                onClick={() => setBudget({ foodMode: "itemized" })}
              >
                Build a food budget
              </button>
            </div>
            {b.foodMode === "estimate" ? (
              <FoodEstimate adv={adv} dispatch={dispatch} />
            ) : (
              <FoodItemized adv={adv} dispatch={dispatch} />
            )}
          </div>
        ) : null}
      </div>

      <div className="divlabel">Insurance</div>
      <div className="list">
        <div className="togglerow">
          <span className="row__title">
            Injury insurance (${b.insuranceCost}/person)
          </span>
          <button
            type="button"
            className={`toggle ${b.insuranceOn ? "on" : ""}`}
            onClick={() => setBudget({ insuranceOn: !b.insuranceOn })}
            aria-pressed={b.insuranceOn}
            aria-label="Injury insurance"
          >
            <span className="knob" />
          </button>
        </div>
      </div>

      <div className="divlabel">Breakdown</div>
      <div className="list">
        <Breakdown adv={adv} />
      </div>
    </>
  );
}

function FoodEstimate({ adv, dispatch }: StepProps) {
  const setBudget = budgetPatch(adv, dispatch);
  const b = adv.budget;
  return (
    <>
      <SliderRow
        label="Number of meals"
        valueText={`${b.meals} meals`}
        value={b.meals}
        min={0}
        max={12}
        onChange={(v) => setBudget({ meals: v })}
        padless
      />
      <div
        className="form-grid mt3"
        style={{ gridTemplateColumns: "1fr 1fr", maxWidth: 320 }}
      >
        <div className="field-group">
          <label className="label" htmlFor="food-per-meal">
            $ per meal
          </label>
          <input
            id="food-per-meal"
            className="field"
            type="number"
            min={0}
            step={1}
            value={b.costPerMeal}
            onChange={(e) => setBudget({ costPerMeal: Number(e.target.value) })}
          />
        </div>
      </div>
      <p className="field-hint mt2">
        $7/meal is a solid group-food estimate for a weekend trip. {b.meals}{" "}
        meals × ${b.costPerMeal} ={" "}
        <span className="strong">${foodPerPerson(adv)}</span> per person.
      </p>
    </>
  );
}

function FoodItemized({ adv, dispatch }: StepProps) {
  const setBudget = budgetPatch(adv, dispatch);
  const b = adv.budget;
  const setItem = (idx: number, key: "label" | "cost", value: string) =>
    setBudget({
      foodItems: b.foodItems.map((f, i) =>
        i === idx
          ? { ...f, [key]: key === "cost" ? Number(value) : value }
          : f,
      ),
    });
  return (
    <>
      <div className="list mt3">
        {b.foodItems.map((f, idx) => (
          <div className="itin-row" key={idx}>
            <div className="desc">
              <input
                className="field"
                value={f.label}
                onChange={(e) => setItem(idx, "label", e.target.value)}
                placeholder="e.g. Sat dinner"
                aria-label={`Food item ${idx + 1} label`}
              />
            </div>
            <div style={{ width: 100 }}>
              <input
                className="field"
                type="number"
                min={0}
                value={f.cost}
                onChange={(e) => setItem(idx, "cost", e.target.value)}
                placeholder="$"
                aria-label={`Food item ${idx + 1} cost`}
              />
            </div>
            <button
              type="button"
              className="rowbtn"
              onClick={() =>
                setBudget({
                  foodItems: b.foodItems.filter((_, i) => i !== idx),
                })
              }
              aria-label={`Remove food item ${idx + 1}`}
            >
              <IconX />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="addrow"
          onClick={() =>
            setBudget({
              foodItems: [...b.foodItems, { label: "New item", cost: 0 }],
            })
          }
        >
          <IconPlus /> Add a meal or snack cost
        </button>
      </div>
      <p className="field-hint mt2">
        Per-person food total: <span className="strong">${foodPerPerson(adv)}</span>
      </p>
    </>
  );
}

function Breakdown({ adv }: { adv: Adventure }): ReactNode {
  const rows = budgetBreakdown(adv);
  return (
    <>
      {rows.length ? (
        rows.map(([label, value]) => (
          <div className="row" key={label}>
            <span className="row__body">
              <span className="row__title">{label}</span>
            </span>
            <span className="strong">${value}</span>
          </div>
        ))
      ) : (
        <div className="row">
          <span className="row__body muted">
            No costs yet — everything&apos;s free so far.
          </span>
        </div>
      )}
      <div className="budget-total">
        <span className="l">Total per person</span>
        <span className="v" data-budget-total>
          ${budgetTotal(adv)}
        </span>
      </div>
      <div className="row">
        <span className="row__body">
          <span className="row__sub">Total trip cost ({adv.capacity} ppl)</span>
        </span>
        <span className="strong">${budgetTotal(adv) * adv.capacity}</span>
      </div>
    </>
  );
}

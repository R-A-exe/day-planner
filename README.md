# day-planner
A simple day planning schedule

Link https://r-a-exe.github.io/day-planner/

## High-Level Description

Day planner with color coded time tracking and task saving capability.

![Screenshot](/assets/images/screenshot.png)

## The schedule

The webpage contains a schedule of a workday's business hours, color coded as follows:
    - Red: hour slot has already passed;
    - Grey: current hour slot;
    - Green: future hour slot.

## Adding and saving items

In order to add an item, click on the timeslot you wish to save your item in.

As soon as you begin typing/editing, a "SAVE" button will appear.

When done editing, if you wish to save the item, press the "SAVE" button. If you do not wish to save, simply refresh the page.

## Storage

The items in the agenda are added to the local storage; if the planner is closed or refreshed within the same day, saved items will not be lost.

NOTE: Unsaved changes will be lost upon page reload.

NOTE: Items are only saved for the duration of the day; they are overritten the first time the planner is reloaded on a new day.
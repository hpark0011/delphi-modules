# 1. Project description

Redesign the mind score card and how it provides feedback when user adds content to the training queue.

## 1.1) Objective

- Primary: Increase the average number of content in queue = total content / # of active users
- Secondary: Increase the add content retention rate

## 1.2) Problem & solution

**Context**

- Adding content to the mind is arduous. We added a “mind score” to gamify this with the mind score and add a layer of external motivation.

**Problem**

- Mind score in existing home, doesn’t provide clear feedback that adding content and creating profile adds mind score to the mind.
- Lacks some mechanics of psychology that makes the gamification work. (This isn’t considered at this phase)
  - Self-determination theory
  - Goal gradient effect (progress bar)
  - Positive feedback loop
  - Random rewards
- There are too many main buttons (Preview, share, add to mind, mind level, mind score, progress bar, training status) and UI elements that is competing for user’s attention when it’s not needed.

**Solution**

- Clear tooltip and summary view
- Show buttons and UI elements only when it’s needed.

# 2. User flow

- User clicks mind score card, mind section → add content modal popup → user adds content → confirmation toast → # of items added shows up in the mind score card, training status → #of items training, failed, completed gets shown in the summary as it processes → (user can add more items to the queue) → training queue finishes → user previews → resets the widget

# 3. Mind widget

There are three parts in the mindscore widget

- Mindscore
- Training queue status
- Modal for detail views of training queue status and add knowledge

## 3.1) Mindscore

Displays

- Mindscore value
- Mind level
- Progress towards next mind level

When clicked

- Opens the modal for detail views of training queue status and add knowledge

When hovered

- Shows progress bar (in mobile this should be always visible)
- Shows add content button (in mobile this should be always visible)

Need to figure out

- The button placement to show all the mind levels

## 3.2) Training queue status

### a) Training queue status

The overall status of the training queue

- States:
  - dull: Default state. No training going on and user has reviewed all updates.
  - active: When there are items in the training queue (has queued or training items)
  - finished: All items are finished (failed, completed, or deleted). No queued or training items, and user hasn't reviewed the recent change.
- State transition:
  - dull → (add items) → active → (all complete) → finished → (user reviews) → dull

Training queue status is used in:

- Mind widget’s training queue status area
- Modal
- Preview button

### b) Training item status

The status of an individual item in the training queue

- Active training queue item status
  - queued: Item is waiting to be processed
  - training: Item is currently being processed
- Finished training queue item status
  - completed: Item completed successfully
  - failed: Item failed during processing
  - deleted: Item was deleted (final state)

Training item status is used in:

- To determine the training queue status
- To show the # of items training, failed, completed
- Mind widget’s training summary area, expanded view
- Modal’s detailed summary view

## 3.3) Modal

There are two tabs

- Training status & add knowledge (Add knowledge will be worked by Joe)

Training status

- It shows the detailed view of the items that is being trained

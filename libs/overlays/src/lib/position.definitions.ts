import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { DialogConfig, DialogPositions } from './dialog.models';

export function getPositionsWithOffset(config: DialogConfig) {
  const topOffsets = {
    offsetX: config.offsetX,
    offsetY: -1 * config.offsetY - 3 // add 2px spacing + 1px for outline
  };
  const topPos = [
    { ...centeredTop, ...topOffsets },
    { ...startTop, ...topOffsets },
    { ...endTop, ...topOffsets }
  ];

  const bottomOffsets = {
    offsetX: config.offsetX,
    offsetY: config.offsetY + 3 // add 2px spacing + 1px for outline
  };

  const bottomPos = [
    { ...centeredBottom, ...bottomOffsets },
    { ...startBottom, ...bottomOffsets },
    { ...endBottom, ...bottomOffsets }
  ];

  const startBottomPos = [
    { ...startBottom, ...bottomOffsets },
    { ...centeredBottom, ...bottomOffsets },
    { ...endBottom, ...bottomOffsets }
  ];

  const startTopPos = [
    { ...startTop, ...topOffsets },
    { ...centeredTop, ...topOffsets },
    { ...endTop, ...topOffsets }
  ];

  const rightOffsets = {
    offsetX: config.offsetX,
    offsetY: config.offsetY
  };
  const rightPos = [
    { ...rightOffsets, ...centeredRight },
    { ...rightOffsets, ...topRight },
    { ...rightOffsets, ...bottomRight }
  ];

  const leftOffsets = {
    offsetX: -1 * config.offsetX,
    offsetY: config.offsetY
  };
  const leftPos = [
    { ...centeredLeft, ...leftOffsets },
    { ...topLeft, ...leftOffsets },
    { ...bottomLeft, ...leftOffsets }
  ];

  const insideLeftOffsets = {
    offsetX: config.offsetX,
    offsetY: config.offsetY
  };

  const insideLeftPos = [
    { ...insideLeftOffsets, ...insideCenterLeft },
    { ...insideLeftOffsets, ...insideTopLeft },
    { ...insideLeftOffsets, ...insideBottomLeft }
  ];

  return {
    [DialogPositions.TOP]: topPos,
    [DialogPositions.BOTTOM]: bottomPos,
    [DialogPositions.LEFT]: leftPos,
    [DialogPositions.RIGHT]: rightPos,
    [DialogPositions.INSIDE_LEFT]: insideLeftPos,
    [DialogPositions.START_BOTTOM]: startBottomPos,
    [DialogPositions.START_TOP]: startTopPos
  };
}

// TOP
const centeredTop: ConnectionPositionPair = {
  panelClass: 'centered-top',
  overlayX: 'center',
  overlayY: 'bottom',
  originX: 'center',
  originY: 'top'
};
const startTop: ConnectionPositionPair = {
  panelClass: 'start-top',
  overlayX: 'start',
  overlayY: 'bottom',
  originX: 'start',
  originY: 'top'
};
const endTop: ConnectionPositionPair = {
  panelClass: 'end-top',
  overlayX: 'end',
  overlayY: 'bottom',
  originX: 'end',
  originY: 'top'
};

// BOTTOM
const centeredBottom: ConnectionPositionPair = {
  panelClass: 'centered-bottom',
  overlayX: 'center',
  overlayY: 'top',
  originX: 'center',
  originY: 'bottom'
};
const startBottom: ConnectionPositionPair = {
  panelClass: 'start-bottom',
  overlayX: 'start',
  overlayY: 'top',
  originX: 'start',
  originY: 'bottom'
};
const endBottom: ConnectionPositionPair = {
  panelClass: 'end-bottom',
  overlayX: 'end',
  overlayY: 'top',
  originX: 'end',
  originY: 'bottom'
};

// RIGHT
const centeredRight: ConnectionPositionPair = {
  overlayX: 'start',
  overlayY: 'center',
  originX: 'end',
  originY: 'center',
  panelClass: 'centered-right'
};
const topRight: ConnectionPositionPair = {
  overlayX: 'start',
  overlayY: 'top',
  originX: 'end',
  originY: 'top',
  panelClass: 'top-right'
};
const bottomRight: ConnectionPositionPair = {
  overlayX: 'start',
  overlayY: 'bottom',
  originX: 'end',
  originY: 'bottom',
  panelClass: 'bottom-right'
};

// LEFT
const centeredLeft: ConnectionPositionPair = {
  overlayX: 'end',
  overlayY: 'center',
  originX: 'start',
  originY: 'center',
  panelClass: 'centered-left'
};
const topLeft: ConnectionPositionPair = {
  overlayX: 'end',
  overlayY: 'top',
  originX: 'start',
  originY: 'top',
  panelClass: 'top-left'
};
const bottomLeft: ConnectionPositionPair = {
  overlayX: 'end',
  overlayY: 'bottom',
  originX: 'start',
  originY: 'bottom',
  panelClass: 'bottom-left'
};

// INSIDE LEFT
const insideCenterLeft: ConnectionPositionPair = {
  overlayX: 'start',
  overlayY: 'center',
  originX: 'start',
  originY: 'center',
  panelClass: 'centered-right'
};
const insideTopLeft: ConnectionPositionPair = {
  overlayX: 'start',
  overlayY: 'top',
  originX: 'start',
  originY: 'top',
  panelClass: 'centered-right'
};
const insideBottomLeft: ConnectionPositionPair = {
  overlayX: 'start',
  overlayY: 'bottom',
  originX: 'start',
  originY: 'bottom',
  panelClass: 'centered-right'
};

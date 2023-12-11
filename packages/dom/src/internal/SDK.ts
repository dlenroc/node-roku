import type { Executor as ECPExecutor } from '@dlenroc/roku-ecp';
import type { Executor as ODCExecutor } from '@dlenroc/roku-odc';

export type SDK = {
  ecp: ECPExecutor;
  odc: ODCExecutor;
};

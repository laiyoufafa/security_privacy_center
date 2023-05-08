/**
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Ability from '@ohos.app.ability.UIAbility';
import type Want from '@ohos.app.ability.Want';
import type Window from '@ohos.window';
import type UIAbilityContext from 'application/UIAbilityContext';
import { BusinessError } from '@ohos.base';

class PwdStore {
  private certPwd: string = '';
  setCertPwd(pwd: string): void {
    this.certPwd = pwd;
  }

  getCertPwd(): string {
    return this.certPwd;
  }

  clearCertPwd(): void {
    this.certPwd = '';
  }
}

export default class MainAbility extends Ability {
  onCreate(want: Want, launchParam): void {
    console.log('[Demo] MainAbility onCreate');
    globalThis.certManagerAbilityContext = this.context as UIAbilityContext;
    globalThis.PwdStore = new PwdStore();
    globalThis.abilityWant = want as Want;
    globalThis.abilityContext = this.context as UIAbilityContext;;
  }

  onDestroy(): void {
    console.log('[Demo] MainAbility onDestroy');
  }

  onWindowStageCreate(windowStage: Window.WindowStage): void {
    // Main window is created, set main page for this ability
    console.log('[Demo] MainAbility onWindowStageCreate');
    let stage: Window.WindowStage = windowStage as Window.WindowStage;
    stage.loadContent('pages/certManagerFa', (err: BusinessError<void>, data) => {
      if (err.code) {
        console.error('onWindowStageCreate failed, cause:' + JSON.stringify(err));
        return;
      }
    });
  }

  onWindowStageDestroy(): void {
    // Main window is destroyed, release UI related resources
    console.log('[Demo] MainAbility onWindowStageDestroy');
  }

  onForeground(): void {
    // Ability has brought to foreground
    console.log('[Demo] MainAbility onForeground');
  }

  onBackground(): void {
    // Ability has back to background
    console.log('[Demo] MainAbility onBackground');
  }

  onNewWant(want: Want): void {
    console.log('[Demo] MainAbility onNewWant');
    globalThis.abilityWant = want as Want;
  }
};

import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  FormType,
  GAME_SLUG,
  Z_match,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'match-form',
  templateUrl: './match-form.component.html',
})
export class MatchFormComponent {
  private fb = inject(FormBuilder);

  @Input() formType: 'add' | 'update' = 'add';

  GAMES = Array.from(GAME_SLUG);
  previousFilenames: any = {};
  zMatch = Z_match;

  protected showErrors = false;
  protected matchForm = this.fb.nonNullable.group<ControlsOf<FormType>>({
    gameSlug: new FormControl('cricket', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teamOne: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teamTwo: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    h2hTeam: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    league: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    venue: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    startDate: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    startTime: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    status: new FormControl('waiting', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    format: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teamOneLogo: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teamTwoLogo: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    h2hTeamImage: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    premiumTeamImage: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    glImage: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teamOnePlayers: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teamTwoPlayers: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    premiumTeamPrice: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  get matchFormControls() {
    return this.matchForm.controls;
  }

  handleTeamOneLogo(file: any) {
    this.matchForm.patchValue({ teamOneLogo: file });
  }

  handleTeamTwoLogo(file: any) {
    this.matchForm.patchValue({ teamTwoLogo: file });
  }

  handleH2hTeamImage(file: any) {
    this.matchForm.patchValue({ h2hTeamImage: file });
  }

  handlePremiumTeamImage(file: any) {
    this.matchForm.patchValue({ premiumTeamImage: file });
  }

  handleGlImage(file: any) {
    this.matchForm.patchValue({ glImage: file });
  }

  getFormValue() {
    const { teamOnePlayers, teamTwoPlayers, ...rest } =
      this.matchForm.getRawValue();
    return {
      teamOnePlayers: this.formatPlayers(teamOnePlayers || ''),
      teamTwoPlayers: this.formatPlayers(teamTwoPlayers || ''),
      ...rest,
    };
  }

  isInValid() {
    return this.matchForm.invalid;
  }

  setShowErrors(value = true) {
    this.showErrors = value;
  }

  reset() {
    this.matchForm.reset();
  }

  patchValue(value) {
    this.matchForm.patchValue(value);
  }

  private formatPlayers(value: string) {
    return value
      .split(',')
      .map((s) => s.trim())
      .join(',');
  }
}

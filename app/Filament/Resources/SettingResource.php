<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingResource\Pages;
use App\Filament\Resources\SettingResource\RelationManagers;
use App\Models\Settings;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SettingResource extends Resource
{
    protected static ?string $model = Settings::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('work_time')
                    ->label('Время работы'),
                Forms\Components\TextInput::make('phone')
                    ->label('Телефон'),
                Forms\Components\TextInput::make('email')
                    ->label('Email'),
                Forms\Components\TextInput::make('name_company')
                    ->label('Название компании'),
                Forms\Components\TextInput::make('full_name_company')
                    ->label('Полное название компании'),
                Forms\Components\TextInput::make('year_open_company')
                    ->label('Год открытия компании'),
                Forms\Components\TextInput::make('inn')
                    ->label('ИНН'),
                Forms\Components\TextInput::make('kpp')
                    ->label('КПП'),
                Forms\Components\TextInput::make('orgn')
                    ->label('ОРГН'),
                Forms\Components\TextInput::make('mail_address')
                    ->label('Почтовый адрес'),
                Forms\Components\TextInput::make('fakt_address')
                    ->label('Фактический адрес'),
                Forms\Components\TextInput::make('tax_system')
                    ->label('Система налогообложения'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('work_time')
                    ->label('Время работы'),
                Tables\Columns\TextColumn::make('phone')
                    ->label('Телефон'),
                Tables\Columns\TextColumn::make('email')
                    ->label('Email'),
                Tables\Columns\TextColumn::make('name_company')
                    ->label('Название компании'),
                Tables\Columns\TextColumn::make('full_name_company')
                    ->label('Полное название компании'),
                Tables\Columns\TextColumn::make('year_open_company')
                    ->label('Год открытия компании'),
                Tables\Columns\TextColumn::make('inn')
                    ->label('ИНН'),
                Tables\Columns\TextColumn::make('kpp')
                    ->label('КПП'),
                Tables\Columns\TextColumn::make('orgn')
                    ->label('ОРН'),
                Tables\Columns\TextColumn::make('mail_address')
                    ->label('Почтовый адрес'),
                Tables\Columns\TextColumn::make('fakt_address')
                    ->label('Фактический адрес'),
                Tables\Columns\TextColumn::make('tax_system')
                    ->label('Система налогообложения'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSettings::route('/'),
            'create' => Pages\CreateSetting::route('/create'),
            'edit' => Pages\EditSetting::route('/{record}/edit'),
        ];
    }
}

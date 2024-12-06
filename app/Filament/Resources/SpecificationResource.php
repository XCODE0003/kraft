<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SpecificationResource\Pages;
use App\Filament\Resources\SpecificationResource\RelationManagers;
use App\Models\Specifications;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\Group;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SpecificationResource extends Resource
{
    protected static ?string $model = Specifications::class;

    protected static ?string $navigationIcon = 'heroicon-o-adjustments-horizontal';
    protected static ?string $navigationLabel = 'Характеристики';
    protected static ?string $title = 'Характеристики';
    protected static ?string $modelLabel = 'Характеристика';
    protected static ?string $pluralLabel = 'Характеристики';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->required()
                    ->label('Название характеристики'),
                FileUpload::make('icon')
                    ->label('Иконка')
                    ->image()
                    ->acceptedFileTypes(['image/svg', 'image/png']),
                TextInput::make('key')
                    ->required()
                    ->label('Ключ. Ключ для характеристики например - ГОСТ(gost), Класс арматуры(class), Марка стали(steel_grade), и т.д.'),
            ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Характеристика'),
                TextColumn::make('key')
                    ->label('Ключ'),
                ImageColumn::make('icon')
                    ->label('Иконка'),
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
            'index' => Pages\ListSpecifications::route('/'),
            'create' => Pages\CreateSpecification::route('/create'),
            'edit' => Pages\EditSpecification::route('/{record}/edit'),
        ];
    }
}

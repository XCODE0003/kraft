<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\Section;
use Filament\Tables\Table;
use Filament\Forms\Components\Split;
use Filament\Forms\Components\TextInput;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Repeater;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\Group;
use Filament\Infolists\Components\Grid;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $navigationLabel = 'Товары';
    protected static ?string $title = 'Товары';
    protected static ?string $modelLabel = 'Товар';
    protected static ?string $pluralLabel = 'Товары';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->label('Название')
                            ->maxLength(255),
                        Forms\Components\Select::make('subcategory_id')
                            ->relationship('subcategory', 'name')
                            ->required()
                            ->label('Подкатегория'),
                        Forms\Components\Textarea::make('description')
                            ->required()
                            ->label('Описание'),
                        Forms\Components\TextInput::make('quantity')
                            ->required()
                            ->label('Количество'),
                    ])->columns(2),

                Forms\Components\FileUpload::make('images')
                    ->required()
                    ->label('Изображения'),



                Section::make('Дополнительные характеристики')
                    ->schema([
                        Forms\Components\Toggle::make('is_closeout')
                            ->required()
                            ->label('Распродажа'),
                        Forms\Components\Toggle::make('is_pickup')
                            ->required()
                            ->label('Самовывоз'),
                        Forms\Components\Toggle::make('is_pickup_courier')
                            ->required()
                            ->label('Курьер'),
                        Forms\Components\Toggle::make('is_pickup_point')
                            ->required()
                            ->label('Из пункта выдачи'),
                    ])->columns(2),
                Section::make('Характеристики')
                    ->schema([
                        Repeater::make('specifications')
                            ->label('')
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->label('Характеристика'),
                                TextInput::make('key')
                                    ->required()
                                    ->label('Ключ. Ключ для характеристики например - ГОСТ(gost), Класс арматуры(class), Марка стали(steel_grade), и т.д.'),
                                TextInput::make('value')
                                    ->required()
                                    ->label('Значение'),
                            ]),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Название'),
                Tables\Columns\ImageColumn::make('images')
                    ->label('Изображения'),
                Tables\Columns\TextColumn::make('subcategory.name')
                    ->label('Подкатегория'),
                Tables\Columns\TextColumn::make('quantity')
                    ->label('Количество'),
                Tables\Columns\ToggleColumn::make('is_closeout')
                    ->label('Распродажа'),
                Tables\Columns\ToggleColumn::make('is_pickup')
                    ->label('Самовывоз'),
                Tables\Columns\ToggleColumn::make('is_pickup_courier')
                    ->label('Курьер'),
                Tables\Columns\ToggleColumn::make('is_pickup_point')
                    ->label('Из пункта выдачи'),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
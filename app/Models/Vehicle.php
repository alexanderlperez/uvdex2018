<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];


    public function scopeExclude($query,$value = array())
    {
        $columns = $this->getConnection()->getSchemaBuilder()->getColumnListing($this->getTable());
        return $query->select( array_diff( $columns,(array) $value) );
    }
}

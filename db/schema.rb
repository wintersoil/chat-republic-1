# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_30_095426) do

  create_table "messages", force: :cascade do |t|
    t.integer "user_id"
    t.string "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "mp3"
    t.string "mp4"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "private_messages", force: :cascade do |t|
    t.integer "user_id"
    t.string "body"
    t.string "mp3"
    t.string "mp4"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "recipient"
    t.index ["user_id"], name: "index_private_messages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "user_name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "profile_picture"
    t.boolean "is_online"
    t.boolean "online"
  end

  create_table "video_clients", force: :cascade do |t|
    t.integer "user_id"
    t.integer "client_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_video_clients_on_client_id"
    t.index ["user_id"], name: "index_video_clients_on_user_id"
  end

end

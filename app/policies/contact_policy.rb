class ContactPolicy < ApplicationPolicy

  def index?
    user.id? && (
      record.pluck(:user_id).uniq == [user.id] ||
      record.size.zero?
    )
  end

  def create?
    user.id? && record.user_id == user.id
  end

  def update?
    show?
  end

  def destroy?
    show?
  end

  class Scope < Scope
    def resolve
      scope_user
    end
  end
end

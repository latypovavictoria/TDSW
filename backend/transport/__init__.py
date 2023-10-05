from .init import app
from .auth import app
from .patients import app
from .ecg_inspections import app

__all__ = ["app"]